document.getElementById("inscription").addEventListener("click", function() {
    var mdp1 = document.getElementById("mdp").value;
    var mdp2 = document.getElementById("mdp2").value;
    
    if (mdp1 !== mdp2) {
        alert("Les mots de passe ne correspondent pas");
    }
});
