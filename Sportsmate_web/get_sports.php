<?php
header('Content-Type: application/json');

$host = 'localhost';
$db = 'sportsmate';
$user = 'root';
$pass = 'aled';

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode([]);
    exit;
}

$query = isset($_GET['q']) ? $_GET['q'] : '';
if ($query) {
    $stmt = $pdo->prepare("SELECT sport_name FROM sports WHERE sport_name LIKE ? LIMIT 10");
    $stmt->execute(["%{$query}%"]);
    $results = $stmt->fetchAll(PDO::FETCH_COLUMN);
    echo json_encode($results);
} else {
    echo json_encode([]);
}
?>