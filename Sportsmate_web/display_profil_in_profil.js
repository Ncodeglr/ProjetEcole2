async function fetchProfile() {
    try{
        const response = await fetch('infos_utilisateur.csv'); 
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const csvData = await response.text();
        const rows = csvData.split('\n');

        // Créer une structure HTML pour afficher les informations de l'utilisateur
        
        const profilDiv = document.getElementById('profilDiv');
        profilDiv.classList.add('white_background_profile');

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const userData = row.split(',');
            

            if (userId === userData[6]) {
                
                 // Ajouter la photo de profil
                const profilePic = document.createElement('img');
                profilePic.src = "upload_utilisateurs/" + userData[7]; // Lien vers la photo de profil
                profilePic.style.width = "100px";
                profilePic.style.height = "100px";
                profilePic.style.objectFit = "cover"; //permet de rogner l'image pour la redimensionner
                profilePic.style.borderRadius = "50%";
                profilePic.classList.add('PhotoProfil');
                profilDiv.appendChild(profilePic);

                // Ajouter le prénom et l'âge
                const identite = document.createElement('p');
                identite.textContent = `${userData[0]}, ${userData[1]}`;
                identite.classList.add('nomProfil');
                profilDiv.appendChild(identite);

                //Ajouter le titre bio du profil
                const Titrebio = document.createElement('p');
                Titrebio.textContent = "Bio";
                Titrebio.classList.add('TitreBioProfil');
                profilDiv.appendChild(Titrebio);

                //Ajouter la bio du profil
                const bio = document.createElement('p');
                bio.textContent = `${userData[8]}`;
                profilDiv.appendChild(bio);

                //Ajouter le titre sport
                const Titresport = document.createElement('p');
                Titresport.textContent = "Sports";
                Titresport.classList.add('TitreSportProfil');
                profilDiv.appendChild(Titresport);

                // Ajouter les sports préférés
                const sports1 = document.createElement('p');
                sports1.textContent = `${userData[3]}`;
                profilDiv.appendChild(sports1);

                const sports2 = document.createElement('p');
                sports2.textContent = `${userData[4]}`;
                profilDiv.appendChild(sports2);

                const sports3 = document.createElement('p');
                sports3.textContent = `${userData[5]}`;
                profilDiv.appendChild(sports3);



                break;//pour arrêter la boucle
            } else {
                console.log("erreur");
            }
            
        }





    } catch (error) {
        console.error('Erreur :', error);
    }
}
fetchProfile();