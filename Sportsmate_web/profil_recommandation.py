from flask import Flask, request, jsonify, session
import pymysql
import pandas as pd

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Utilisé pour sécuriser les sessions

# Fonction pour obtenir les posts pour un utilisateur donné
def get_posts_for_user(user_id):
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='aled',
        db='sportsmate'
    )
    cursor = connection.cursor()

    # Récupérer le cluster de l'utilisateur connecté
    cluster_query = "SELECT cluster FROM users WHERE id = %s"
    cursor.execute(cluster_query, (user_id,))
    user_cluster = cursor.fetchone()[0]

    # Récupérer les ID des utilisateurs dans le même cluster
    users_in_cluster_query = "SELECT id FROM users WHERE cluster = %s"
    cursor.execute(users_in_cluster_query, (user_cluster,))
    user_ids_in_cluster = cursor.fetchall()
    user_ids_in_cluster = [user_id[0] for user_id in user_ids_in_cluster]

    # Récupérer les posts des utilisateurs dans le même cluster
    user_ids_in_cluster_str = ','.join(map(str, user_ids_in_cluster))
    posts_query = f"SELECT * FROM posts WHERE user_id IN ({user_ids_in_cluster_str})"
    posts = pd.read_sql(posts_query, connection)

    cursor.close()
    connection.close()

    return posts

# Route pour obtenir les posts pour l'utilisateur connecté
@app.route('/user_posts')
def user_posts():
    if 'user_id' in session:
        user_id = session['user_id']
        posts = get_posts_for_user(user_id)
        return jsonify(posts.to_dict(orient='records'))
    else:
        return jsonify({"error": "User not logged in"}), 401

# Simuler la connexion d'un utilisateur pour l'exemple
@app.route('/login', methods=['POST'])
def login():
    user_id = request.form['user_id']
    session['user_id'] = user_id
    return jsonify({"message": "Logged in"}), 200

# Simuler la déconnexion d'un utilisateur
@app.route('/logout')
def logout():
    session.pop('user_id', None)
    return jsonify({"message": "Logged out"}), 200

if __name__ == '__main__':
    app.run(debug=True)
