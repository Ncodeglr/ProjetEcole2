async function fetchUserPosts() {
    try{
        
        const response = await fetch('posts_utilisateurs.csv'); 
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const csvData = await response.text();
        const rows = csvData.split('\n');

        // Créer une structure HTML pour afficher les informations de l'utilisateur
        const postDiv = document.getElementById('postDiv');
        

        for (let i = rows.length - 1; i >= 0; i--) {
            const row = rows[i];
            const userData = row.split(',');
            const postUniqueConteneur = document.createElement('div');
            postUniqueConteneur.classList.add('white_background_post');

            //Ici on récupère la photo de profil et le username
            const response2 = await fetch('infos_utilisateur.csv'); 
            if (!response2.ok) {
                throw new Error('Erreur lors de la récupération des données');
            }
            const csvData2 = await response2.text();
            const rows2 = csvData2.split('\n');

            for (let i = rows2.length - 1; i >= 0; i--) {
                const row2 = rows2[i];
                const userData2 = row2.split(',');
                
                if (userId === userData2[6]) {
                    
                    // Ajouter la photo de profil
                    const ProfilPic = document.createElement('img');
                    ProfilPic.src = "upload_utilisateurs/" + userData2[7]; // Lien vers la photo de profil
                    ProfilPic.style.width = "40px";
                    ProfilPic.style.height = "40px";
                    ProfilPic.style.objectFit = "cover"; //permet de rogner l'image pour la redimensionner
                    ProfilPic.style.borderRadius = "50%";
                    postUniqueConteneur.appendChild(ProfilPic);

                    //Ajouter le username
                    const username = document.createElement('p');
                    username.textContent = `${userData2[0]}`;
                    username.classList.add('username');
                    postUniqueConteneur.appendChild(username);

                    break;//pour arrêter la boucle
                } else {
                    console.log("erreur");
                }
            }
            //fin de la récupération de la pdp



            if (userId === userData[0]) {
                
                //Ajouter une ligne de déliimitation
                const ligneDelimit = document.createElement('div');
                ligneDelimit.classList.add('ligneDelimit');
                postUniqueConteneur.appendChild(ligneDelimit);

                // Ajouter la photo de profil
                const postPic = document.createElement('img');
                postPic.src = "upload_utilisateurs/" + userData[3]; // Lien vers la photo de profil
                //postPic.style.width = "620px";
                //postPic.style.height = "500px";
                postPic.style.objectFit = "cover"; //permet de rogner l'image pour la redimensionner
                postPic.classList.add('postPic');
                postUniqueConteneur.appendChild(postPic);

                //Ajouter une deuxième ligne de déliimitation
                const ligneDelimit2 = document.createElement('div');
                ligneDelimit2.classList.add('ligneDelimit');
                postUniqueConteneur.appendChild(ligneDelimit2);


                //Ajouter le titre du post
                const TitrePost = document.createElement('p');
                TitrePost.textContent = `${userData[1]}`;
                TitrePost.classList.add('TitrePost');
                postUniqueConteneur.appendChild(TitrePost);

                //Ajouter la description du post
                const description = document.createElement('p');
                description.textContent = `${userData[2]}`;
                description.classList.add('description');
                postUniqueConteneur.appendChild(description);

                //Ajouter l'heure et la date de l'événement
                const DateHeure = document.createElement('p');
                const boldText = document.createElement('strong');
                boldText.textContent = "Date : ";
                DateHeure.appendChild(boldText);
                DateHeure.appendChild(document.createTextNode(userData[4]));
                
               
                postUniqueConteneur.appendChild(DateHeure);

                //Ajouter le lieu de l'événement
                const lieu = document.createElement('p');
                const boldText2 = document.createElement('strong');
                boldText2.textContent = "Lieu : ";
                lieu.appendChild(boldText2);
                lieu.appendChild(document.createTextNode(userData[5]));
                postUniqueConteneur.appendChild(lieu);
                postDiv.appendChild(postUniqueConteneur);


                




                postDiv.appendChild(postUniqueConteneur);
                

                //break;//pour arrêter la boucle
            } else {
                console.log("erreur");
            }
            
        }





    } catch (error) {
        console.error('Erreur :', error);
    }
}
fetchUserPosts();