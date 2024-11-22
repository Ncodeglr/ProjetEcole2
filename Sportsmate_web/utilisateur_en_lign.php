<?php
session_start(); // Démarre la session

$user_id = $_SESSION['user_id'];
// Affiche l'ID utilisateur dans une balise <script> en tant que constante JavaScript
echo 'const userId = ' . json_encode($user_id) . ';';
?>