async function fetchProfile() {
    try {
        const response = await fetch('fetch_mysql_profile.php'); 
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const profileData = await response.json();
        const profilDiv = document.getElementById('profilDiv');
        profilDiv.classList.add('white_background_profile');

        // Vérifier si des données sont retournéées
        if (profileData) {
            // Ajouter la photo de profil
            const profilePic = document.createElement('img');
            profilePic.src = "upload_utilisateurs/" + profileData.pdp; // Lien vers la photo de profil
            profilePic.style.width = "100px";
            profilePic.style.height = "100px";
            profilePic.style.objectFit = "cover"; // Permet de rogner l'image pour la redimensionner
            profilePic.style.borderRadius = "50%";
            profilePic.classList.add('PhotoProfil');
            profilDiv.appendChild(profilePic);

            // Ajouter le nom d'utilisateur
            const identite = document.createElement('p');
            identite.textContent = profileData.username;
            identite.classList.add('nomProfil');
            profilDiv.appendChild(identite);

            // Ajouter le titre bio du profil
            const Titrebio = document.createElement('p');
            Titrebio.textContent = "Bio";
            Titrebio.classList.add('TitreBioProfil');
            profilDiv.appendChild(Titrebio);

            // Ajouter la bio du profil 
            const bio = document.createElement('p');
            bio.textContent = profileData.bio || 'Aucune bio disponible';
            profilDiv.appendChild(bio);

            // Ajouter le titre sport
            const Titresport = document.createElement('p');
            Titresport.textContent = "Sports";
            Titresport.classList.add('TitreSportProfil');
            profilDiv.appendChild(Titresport);

            // Ajouter les sports préférés 
            const sports1 = document.createElement('p');
            sports1.textContent = profileData.sport1 || 'Aucun sport préféré';
            profilDiv.appendChild(sports1);

            const sports2 = document.createElement('p');
            sports2.textContent = profileData.sport2 || '';
            profilDiv.appendChild(sports2);

            const sports3 = document.createElement('p');
            sports3.textContent = profileData.sport3 || '';
            profilDiv.appendChild(sports3);
        } else {
            console.log("Aucune donnée de profil trouvée");
        }
    } catch (error) {
        console.error('Erreur :', error);
    }
}

fetchProfile();