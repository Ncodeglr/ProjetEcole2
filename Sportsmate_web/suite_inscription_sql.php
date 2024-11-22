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

// on récupère les string entrées par l'utilisateur
$text1 = $_POST['prenom'];
$text2 = $_POST['age'];
$text3 = $_POST['genre'];
$text4 = $_POST['sport1'];
$text5 = $_POST['sport2'];
$text6 = $_POST['sport3'];

$sport1 = $_POST['sport_input1'];
$sport2 = $_POST['sport_input2'];
$sport3 = $_POST['sport_input3'];

$user_id = $_SESSION['user_id']; //on récupère l'id de l'user
$pdp = $_POST['file_name'];
$bio = $_POST['bio'];

$target_dir = "/var/www/sportsmate/Sportsmate_web/upload_utilisateurs/"; // Dossier où les fichiers seront enregistrés


$uniqueId = uniqid();

$fileExtension = pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION);

$newFileName = $uniqueId . '.' . $fileExtension;

$target_file = $target_dir . $newFileName;


// Préparer la requête SQL d'update à faire
$sql = "UPDATE users SET prenom='$text1', age='$text2', genre='$text3', sport1='$sport1', sport2='$sport2', sport3='$sport3', pdp='$newFileName', bio='$bio' WHERE user_id='$user_id'";




// Exécuter la requête SQL et upload 
if (mysqli_query($conn, $sql) && move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
    // Redirection vers la page de suite d'inscription en cas de succès
    header('Location: refonte_page_princ.html');
    exit(); // terminer le script PHP après la redirection
} else {
    // Afficher un message d'erreur en cas d'échec de l'insertion
    echo "Erreur lors de l'insertion des données ou de l'upload: " . mysqli_error($conn);
}



?>