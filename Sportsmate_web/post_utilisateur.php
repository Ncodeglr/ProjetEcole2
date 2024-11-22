<?php
session_start(); // Démarre la session
// Chemin vers le fichier CSV
$filename = 'posts_utilisateurs.csv';

$user_id = $_SESSION['user_id'];
$text1 = $_POST['PostTitle'];// on récupère les string entrées par l'utilisateur
$text2 = $_POST['Description'];
$text3 = $_POST['file_name'];
$text4 = $_POST['datePicker'];
$text5 = $_POST['Lieu'];

$new_row = array($user_id, $text1, $text2, $text3, $text4, $text5);

if (file_exists($filename)) {
    // Ouvrir le fichier en lecture
    $file = fopen($filename, 'a');

    // Vérifier si l'ouverture du fichier a réussi
    if ($file !== false) {
        
   
        fputcsv($file, $new_row);
        
        // Fermer le fichier
        fclose($file);
       
        
    } else {
        // Afficher un message d'erreur si l'ouverture du fichier a échoué
        echo "Erreur : Impossible d'ouvrir le fichier.";
    }
} else {
    // Afficher un message d'erreur si le fichier n'existe pas
    echo "Erreur : Le fichier n'existe pas.";
}

$target_dir = "/Applications/XAMPP/xamppfiles/htdocs/Proj104/sportsmate/Sportsmate_web/upload_utilisateurs/"; // Dossier où les fichiers seront enregistrés
$target_file = $target_dir . basename($_FILES["photo"]["name"]); // Chemin complet du fichier téléchargé



if (move_uploaded_file($_FILES["photo"]["tmp_name"], $target_file)) {
    header("Location: refonte_page_princ.html");
    exit();
} else {
    echo "Erreur lors de l'upload du fichier";
}




?>