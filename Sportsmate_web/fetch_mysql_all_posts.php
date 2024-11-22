<?php
session_start(); 
$host = 'localhost'; 
$user = 'root'; 
$password = 'aled'; 
$database = 'sportsmate';

$connected_id = $_SESSION['user_id'];


header('Content-Type: application/json');
setcookie("userID", $_SESSION['user_id'], time() + 86400, "/", "", true, true);


// Connexion à la base de données
$conn = new mysqli($host, $user, $password, $database);


if ($conn->connect_error) {
    die(json_encode(["error" => "Erreur de connexion à la base de données : " . $conn->connect_error]));
}

//contre les injec SQL
$sql = "SELECT posts.*, users.username, users.pdp FROM posts 
        JOIN users ON posts.user_id = users.user_id
        WHERE posts.user_id != ?
        ORDER BY posts.user_id DESC";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $connected_id);
$stmt->execute();
$result = $stmt->get_result();

$posts = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $posts[] = $row;
    }
}

echo json_encode($posts);

$stmt->close();
$conn->close();
?>