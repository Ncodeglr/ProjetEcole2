// Fonction pour ouvrir le pop-up
function openPopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "block"; // Affiche le pop-up
}

// Fonction pour fermer le pop-up
function closePopup() {
    var popup = document.getElementById("popup");
    popup.style.display = "none"; // Cache le pop-up
}

// Fonction pour ouvrir la suite du post
function AjoutPost() {
    var popup = document.getElementById("ajoutDateLieu");
    popup.style.display = "block"; // Affiche le pop-up
}

function BoutonDisparait() {
    var popup = document.getElementById("boutonAjoutDate");
    popup.style.display = "none"; // Cache le pop-up
}