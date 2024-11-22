

async function fetchResults(pageNumber) {
    try {
        const response = await fetch('infos_utilisateur.csv'); 
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const csvData = await response.text();
        const rows = csvData.split('\n');

        const userDataContainer = document.getElementById('userDataContainer');
        const resultsPerPage = 5;
        const startIndex = (pageNumber - 1) * resultsPerPage;
        const endIndex = pageNumber * resultsPerPage;

        // Efface le contenu précédent
        userDataContainer.innerHTML = '';

        for (let i = startIndex + 1; i < endIndex +1 && i < rows.length; i++) {
            const row = rows[i];
            const userData = row.split(',');

            // Créer une structure HTML pour afficher les informations de l'utilisateur
            const userDiv = document.createElement('div');
            userDiv.classList.add('user');

            //Créer un lien vers le profil 
            const linkToProfile = document.createElement('a');
            linkToProfile.href = "profil_alter.html";

            // Ajouter la photo de profil
            const profilePic = document.createElement('img');
            profilePic.src = "upload_utilisateurs/" + userData[7]; // Lien vers la photo de profil
            profilePic.style.width = "100px";
            profilePic.style.height = "100px";
            profilePic.style.objectFit = "cover"; //permet de rogner l'image pour la redimensionner
            profilePic.style.borderRadius = "50%";
            profilePic.classList.add('pdp');
            userDiv.appendChild(profilePic);

            // Ajouter le prénom et l'âge
            const identite = document.createElement('p');
            identite.textContent = `${userData[0]}, ${userData[1]}`;
            identite.classList.add('identite');
            userDiv.appendChild(identite);

            //Ajouter le lien vers le profil à partir de la pdp et de l'identité
            linkToProfile.appendChild(profilePic);
            linkToProfile.appendChild(identite);
            userDiv.appendChild(linkToProfile);
            identite.classList.add('custom_link_without_hover');
            linkToProfile.classList.add('custom_link_without_hover');

            

            //Ajouter le titre bio du profil
            const Titrebio = document.createElement('p');
            Titrebio.textContent = "Bio";
            Titrebio.classList.add('Titrebio');

            //Ajouter la bio du profil
            const bio = document.createElement('p');
            bio.textContent = `${userData[8]}`;
            bio.classList.add('bio');
            userDiv.appendChild(Titrebio);
            userDiv.appendChild(bio);

            //Ajouter le titre sport
            const Titresport = document.createElement('p');
            Titresport.textContent = "Sports";
            Titresport.classList.add('Titresport');
            userDiv.appendChild(Titresport);

            // Ajouter les sports préférés
            const sports1 = document.createElement('p');
            sports1.textContent = `${userData[3]}`;
            sports1.classList.add('sport1');
            userDiv.appendChild(sports1);

            const sports2 = document.createElement('p');
            sports2.textContent = `${userData[4]}`;
            sports2.classList.add('sport2');
            userDiv.appendChild(sports2);

            const sports3 = document.createElement('p');
            sports3.textContent = `${userData[5]}`;
            sports3.classList.add('sport3');
            userDiv.appendChild(sports3);
            

            //Ajouter les liens vers le profil pour les sports
            linkToProfile.appendChild(sports1);
            linkToProfile.appendChild(sports2);
            linkToProfile.appendChild(sports3);
            sports1.classList.add('custom_link_without_hover');
            sports2.classList.add('custom_link_without_hover');
            sports2.classList.add('custom_link_without_hover');

            userDataContainer.appendChild(userDiv);
        };

        // Gestion de la pagination
        const totalPages = Math.ceil(rows.length / resultsPerPage);
        const paginationContainer = document.getElementById('paginationContainer');
        paginationContainer.innerHTML = ''; // Efface les boutons précédents

        // Création du bouton "Page précédente"
        const previousButton = document.createElement('button');
        previousButton.classList.add('navigationButton1');
        previousButton.addEventListener('click', () => {
            const prevPage = Math.max(1, pageNumber - 1);
            fetchResults(prevPage);
        });
        paginationContainer.appendChild(previousButton);

        // Création du bouton "Page suivante"
        const nextButton = document.createElement('button');
        nextButton.classList.add('navigationButton2');
        nextButton.addEventListener('click', () => {
            const nextPage = Math.min(totalPages, pageNumber + 1);
            fetchResults(nextPage);
        });
        paginationContainer.appendChild(nextButton);
    } catch (error) {
        console.error('Erreur :', error);
    }
}

// Appelez fetchResults pour afficher la première page au chargement
fetchResults(1);
