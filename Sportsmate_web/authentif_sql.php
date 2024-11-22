<?php
session_start();
$host = 'localhost'; 
$user = 'root'; 
$password = 'aled'; 
$database = 'sportsmate';

// Connexion à la base de données
$conn = mysqli_connect($host, $user, $password, $database);

// On vérifie si la connexion a réussi
if (!$conn) {
    die("Erreur de connexion à la base de données : " . mysqli_connect_error());
}

$username = $_POST['nom'];
$password = $_POST['mdp'];


// Préparer et exécuter la requête SQL pour vérifier les identifiants
$stmt = $conn->prepare("SELECT user_id, password FROM users WHERE username = ?");
$stmt->bind_param("s", $username);
$stmt->execute();
$stmt->bind_result($user_id, $stored_password);
$stmt->fetch();

$authenticated = false;

if ($stored_password && $stored_password === $password) {
    $authenticated = true;
    $_SESSION['user_id'] = $user_id; // Stocker le user_id dans la session

    // Enregistrer l'activité de l'utilisateur dans vos logs
    file_put_contents('logs/access.log', "$user_id : Activité de l'utilisateur\n", FILE_APPEND);
}

$stmt->close();
$conn->close();



// Retourner une réponse JSON indiquant si les identifiants sont valides ou non
header('Content-Type: application/json');
echo json_encode(array('authenticated' => $authenticated));


?>