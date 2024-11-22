import pymysql
import pandas as pd
import numpy as np
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler

# Connexion à la base de données
connection = pymysql.connect(
    host='localhost',
    user='root',
    password='aled',
    db='sportsmate'
)

# Extraction des données de la table 'users'
query = "SELECT * FROM users;"
data = pd.read_sql(query, connection)

# Assurer que la colonne 'age' est de type numérique
data['age'] = pd.to_numeric(data['age'], errors='coerce')

# Sélectionner les colonnes pertinentes pour le clustering
features = ['age']

# Supprimer les lignes avec des valeurs manquantes dans 'age'
data = data.dropna(subset=features)

# Standardiser les données
scaler = StandardScaler()
data_scaled = scaler.fit_transform(data[features])

# Appliquer l'algorithme de clustering (KMeans)
kmeans = KMeans(n_clusters=3, random_state=42)
data['cluster'] = kmeans.fit_predict(data_scaled)

# Mettre à jour la table 'users' avec les résultats de clustering
cursor = connection.cursor()

# Ajouter la colonne 'cluster' à la table 'users' si elle n'existe pas déjà
alter_table_query = """
    ALTER TABLE users 
    ADD COLUMN IF NOT EXISTS cluster INT;
"""
cursor.execute(alter_table_query)

# Mettre à jour chaque utilisateur avec le numéro de cluster correspondant
update_query = """
    UPDATE users
    SET cluster = %s
    WHERE id = %s;
"""

for index, row in data.iterrows():
    cursor.execute(update_query, (int(row['cluster']), int(row['id'])))

# Valider les modifications et fermer la connexion
connection.commit()
cursor.close()
connection.close()
