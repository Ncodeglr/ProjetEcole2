document.getElementById("connexionButton").addEventListener("click", function(event) {
    event.preventDefault(); // Empêcher la soumission du formulaire par défaut

    // Récupérer les valeurs des champs de texte
    var username = document.getElementById("nom").value;
    var password = document.getElementById("mdp").value;


    // Envoi de la requête AJAX au serveur PHP
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "authentif_sql.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.authenticated) {
                    // Rediriger vers la page d'accueil si les identifiants sont valides
                    window.location.href = "refonte_page_princ.html";
                } else {
                    // Afficher un message d'erreur si les identifiants sont invalides
                    alert("Identifiants invalides. Veuillez réessayer.");
                }
            } else {
                console.error("Une erreur s'est produite lors de la requête.");
            }
        }
    };
    // Envoyer les données de formulaire au serveur PHP
    xhr.send("nom=" + encodeURIComponent(username) + "&mdp=" + encodeURIComponent(password));
});
