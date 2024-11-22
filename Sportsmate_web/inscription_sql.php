<?php
session_start(); //on démarre la session
$host = 'localhost'; // hôte MariaDB
$user = 'root'; //nom d'utilisateur MariaDB
$password = 'aled'; //mot de passe MariaDB
$database = 'sportsmate';//database utilisée dans mariadb

// Connexion à la base de données
$conn = mysqli_connect($host, $user, $password, $database);

// On vérifie si la connexion a réussi
if (!$conn) {
    die("Erreur de connexion à la base de données : " . mysqli_connect_error());
}

$text1 = $_POST['username'];// on récupère les string entrées par l'utilisateur
$text2 = $_POST['mdp'];
$text3 = $_POST['mdp2'];

if ($text2 === $text3) {
    

    $sql = "INSERT INTO users (username, password) VALUES ('$text1', '$text2')";

    // Exécuter la requête SQL
    if (mysqli_query($conn, $sql)) {
        // Redirection vers la page de suite d'inscription en cas de succès
        // Récupération de l'ID inséré
        $dernierId = mysqli_insert_id($conn);
        $_SESSION['user_id'] = $dernierId;
        header('Location: suite_inscription.html');
        exit; // terminer le script PHP après la redirection
    } else {
        // Afficher un message d'erreur en cas d'échec de l'insertion
        echo "Erreur lors de l'insertion des données : " . mysqli_error($conn);
    }
} else {
    // Redirection vers la page d'inscription en cas de mots de passe non correspondants
    header('Location: inscription.html');
}

// Fermer la connexion à la base de données
mysqli_close($conn);
?>
