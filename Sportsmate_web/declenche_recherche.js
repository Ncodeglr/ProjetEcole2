// Écouter l'événement "Entrée" dans le champ de texte
const searchInput = document.getElementById('recherche');
searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter') {
        event.preventDefault(); // Empêche le rechargement de la page
        window.location.href = 'search_result.html'; 
         // Appeler la fonction pour récupérer et afficher les résultats
    }
});