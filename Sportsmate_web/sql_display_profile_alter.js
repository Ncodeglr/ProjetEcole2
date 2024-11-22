document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('user_id');
    if (userId) {
        try {
            const response = await fetch(`fetch_clicked_user.php?user_id=${userId}`);
            if (!response.ok) {
                throw new Error('Erreur lors de la récup des données');
            }
            const profile = await response.json();
            if (profile.error) {
                throw new Error(profile.error);
            }
            /*
            document.getElementById('username').textContent = profile.username;
            document.getElementById('pdp').src = "upload_utilisateurs/" + profile.pdp;
            document.getElementById('bio').textContent = profile.bio;
            document.getElementById('sport1').textContent = profile.sport1;
            document.getElementById('sport2').textContent = profile.sport2;
            document.getElementById('sport3').textContent = profile.sport3;
*/

            //On va chercher les éléments de données par id
            //const identite = document.getElementById('username');
            //const profilePic = document.getElementById('pdp');
            //const bio = document.getElementById('bio');
            //const sports1 = document.getElementById('sport1');
            //const sports2 = document.getElementById('sport2');
            //const sports3 = document.getElementById('sport3');


            const profilDiv = document.getElementById('profilDiv');
            profilDiv.classList.add('white_background_profile');

            // Ajouter la photo de profil
            const profilePic = document.createElement('img');
            profilePic.src = "upload_utilisateurs/" + profile.pdp; // Lien vers la photo de profil
            profilePic.style.width = "100px";
            profilePic.style.height = "100px";
            profilePic.style.objectFit = "cover"; // Permet de rogner l'image pour la redimensionner
            profilePic.style.borderRadius = "50%";
            profilePic.classList.add('PhotoProfil');
            profilDiv.appendChild(profilePic);

            // Ajouter le nom d'utilisateur
            const identite = document.createElement('p');
            identite.textContent = profile.username;
            identite.classList.add('nomProfil');
            profilDiv.appendChild(identite);

            // Ajouter le titre bio du profil
            const Titrebio = document.createElement('p');
            Titrebio.textContent = "Bio";
            Titrebio.classList.add('TitreBioProfil');
            profilDiv.appendChild(Titrebio);

            // Ajouter la bio du profil
            const bio = document.createElement('p');
            bio.textContent = profile.bio || 'Aucune bio disponible';
            profilDiv.appendChild(bio);

            // Ajouter le titre sport
            const Titresport = document.createElement('p');
            Titresport.textContent = "Sports";
            Titresport.classList.add('TitreSportProfil');
            profilDiv.appendChild(Titresport);

            // Ajouter les sports préférés 
            const sports1 = document.createElement('p');
            sports1.textContent = profile.sport1 || 'Aucun sport préféré';
            profilDiv.appendChild(sports1);

            const sports2 = document.createElement('p');
            sports2.textContent = profile.sport2 || '';
            profilDiv.appendChild(sports2);

            const sports3 = document.createElement('p');
            sports3.textContent = profile.sport3 || '';
            profilDiv.appendChild(sports3);


        } catch (error) {
            console.error('Erreur :', error);
        }
    }
});