<?php
session_start(); 
$host = 'localhost'; 
$user = 'root'; 
$password = 'aled'; 
$database = 'sportsmate';

$connected_id = $_SESSION['user_id'];
setcookie("userID", $_SESSION['user_id'], time() + 86400, "/", "", false, false);


header('Content-Type: application/json');

// Connexion à la base de données
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Erreur de connexion à la base de données : " . $conn->connect_error]));
}

// Récupérer les informations de profil de l'utilisateur connecté
$sql_profile = "SELECT username, pdp, bio, sport1, sport2, sport3 FROM users WHERE user_id = ?";
$stmt_profile = $conn->prepare($sql_profile);
$stmt_profile->bind_param("i", $connected_id);
$stmt_profile->execute();
$result_profile = $stmt_profile->get_result();

$profile = null;
if ($result_profile->num_rows > 0) {
    $profile = $result_profile->fetch_assoc();
}

echo json_encode($profile);

$conn->close();



?>