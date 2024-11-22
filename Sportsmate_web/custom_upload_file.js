document.getElementById('custom-file-upload').addEventListener('click', function() {
    document.getElementById('file-input').click();
  });

//js qui va fetch le click utilisateu sur le bouton choisir fichier

// Sélection de l'élément input de type "file"
const fileInput = document.getElementById('file-input');
// Sélection de l'élément div pour afficher le nom du fichier
const fileNameDisplay = document.getElementById('file-name');

// Écouter les changements dans le champ de sélection de fichier
fileInput.addEventListener('change', function() {
    // Vérifier si un fichier a été sélectionné
    if (fileInput.files.length > 0) {
        // Afficher le nom du fichier sélectionné dans l'élément div
        fileNameDisplay.textContent = fileInput.files[0].name;

        document.getElementById('file-name-hidden').value = fileInput.files[0].name;
    } else {
        
        fileNameDisplay.textContent = 'Aucun fichier sélectionné';
        document.getElementById('file-name-hidden').value = '';
    }
});
