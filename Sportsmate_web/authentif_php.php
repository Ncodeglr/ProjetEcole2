<?php
session_start(); // Démarre la session

$username = $_POST['nom'];
$password = $_POST['mdp'];


// Chemin vers le fichier CSV
$filename = 'donnees_profil.csv';
$authenticated = false;

// Lire le fichier CSV et vérifier les identifiants
$file = fopen($filename, 'r');
while (($data = fgetcsv($file)) !== false) {
    if (ltrim($data[0]) === ltrim($username) && ltrim($data[1]) === ltrim($password) && $data[0]!== null) {//ltrim sert à supprimer les espaces avants
        $authenticated = true;
        $_SESSION['user_id'] = $data[2]; //on récupère l'id de l'utlisateur qui se connecte
        // Enregistrer l'activité de l'utilisateur dans les logs
        file_put_contents('logs/access.log', "$user_id : Activité de l'utilisateur\n", FILE_APPEND);
        break;
        
    }
}
fclose($file);

// Retourner une réponse JSON indiquant si les identifiants sont valides ou non
header('Content-Type: application/json');
echo json_encode(array('authenticated' => $authenticated));



?>
