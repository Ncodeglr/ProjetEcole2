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
$user_id = $_SESSION['user_id'];
$text1 = $_POST['PostTitle'];
$text2 = $_POST['Description'];
$text3 = $_POST['file_name'];
$text4 = $_POST['datePicker'];
$text5 = $_POST['Lieu'];


$target_dir = "/var/www/sportsmate/Sportsmate_web/upload_utilisateurs/"; 


$uniqueId = uniqid();

$fileExtension = pathinfo($_FILES["photo"]["name"], PATHINFO_EXTENSION);

$newFileName = $uniqueId . '.' . $fileExtension;

$target_file = $target_dir . $newFileName;

$sql = "INSERT INTO posts (user_id, postTitle, Description, DescriptionImage, date, Lieu) VALUES ('$user_id ', '$text1', '$text2', '$newFileName', '$text4', '$text5')";




if (mysqli_query($conn, $sql) && move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
    header('Location: refonte_page_princ.html');
    exit(); 
} else {
    echo "Erreur lors de l'insertion des données ou de l'upload: " . mysqli_error($conn);
}







?>