<?php
session_start(); //on démarre la session
// Chemin vers le fichier CSV
$filename = 'donnees_profil.csv';

$text1 = $_POST['username'];// on récupère les string entrées par l'utilisateur
$text2 = $_POST['mdp'];
$text3 = $_POST['mdp2'];


// Vérifier si le fichier existe
if (file_exists($filename)) {
    // Ouvrir le fichier en mode append
    $file = fopen($filename, 'a');

    // Vérifier si l'ouverture du fichier a réussi
    if ($file !== false) {
        if ($text2 === $text3){ //pour vérifier que les mots de passe correspondent
            
            $id_unique = uniqid(); //on génère un id unique pour chaque nouvel utilisateur
            $_SESSION['user_id'] = $id_unique; //on récupère l'identifiant de session
            $new_row = array($text1, $text2, $id_unique);
            fputcsv($file, $new_row);

            
            // Fermer le fichier
            fclose($file);
       
            header('Location: suite_inscription.html');
            exit; // terminer le script PHP après la redirection
        } else {
            header('Location: inscription.html');
        }
       
        
    } else {
        // Afficher un message d'erreur si l'ouverture du fichier a échoué
        echo "Erreur : Impossible d'ouvrir le fichier.";
    }
} else {
    // Afficher un message d'erreur si le fichier n'existe pas
    echo "Erreur : Le fichier n'existe pas.";
}


?>


