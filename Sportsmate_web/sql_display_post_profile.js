async function fetchUserPosts() {
    try {
        //requête pour obtenir les posts de l'utilisateur connecté
        const response = await fetch('fetch_mysql_post_profile.php');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données');
        }
        const posts = await response.json();

        const postDiv = document.getElementById('postDiv');
        postDiv.innerHTML = ''; // Vider le conteneur avant d'ajouter les nouveaux posts

        
        posts.forEach(post => {
            const postUniqueConteneur = document.createElement('div');
            postUniqueConteneur.classList.add('white_background_post');

            // Ajouter la photo de profil
            const ProfilPic = document.createElement('img');
            ProfilPic.src = "upload_utilisateurs/" + post.pdp; // Lien vers la photo de profil
            ProfilPic.style.width = "40px";
            ProfilPic.style.height = "40px";
            ProfilPic.style.objectFit = "cover"; // Permet de rogner l'image pour la redimensionner
            ProfilPic.style.borderRadius = "50%";
            postUniqueConteneur.appendChild(ProfilPic);

            // Ajouter le username
            const username = document.createElement('p');
            username.textContent = post.username;
            username.classList.add('username');
            postUniqueConteneur.appendChild(username);

            // Ajouter une ligne de délimitation
            const ligneDelimit = document.createElement('div');
            ligneDelimit.classList.add('ligneDelimit');
            postUniqueConteneur.appendChild(ligneDelimit);

            // Ajouter la photo du post
            const postPic = document.createElement('img');
            postPic.src = "upload_utilisateurs/" + post.DescriptionImage; // Lien vers la photo du post
            postPic.style.objectFit = "cover"; // Permet de rogner l'image pour la redimensionner
            postPic.classList.add('postPic');
            postUniqueConteneur.appendChild(postPic);

            // Ajouter une deuxième ligne de délimitation
            const ligneDelimit2 = document.createElement('div');
            ligneDelimit2.classList.add('ligneDelimit');
            postUniqueConteneur.appendChild(ligneDelimit2);

            // Ajouter le titre du post
            const TitrePost = document.createElement('p');
            TitrePost.textContent = post.postTitle;
            TitrePost.classList.add('TitrePost');
            postUniqueConteneur.appendChild(TitrePost);

            // Ajouter la description du post
            const description = document.createElement('p');
            description.textContent = post.Description;
            description.classList.add('description');
            postUniqueConteneur.appendChild(description);

            // Ajouter l'heure et la date de l'événement
            const DateHeure = document.createElement('p');
            const boldText = document.createElement('strong');
            boldText.textContent = "Date : ";
            DateHeure.appendChild(boldText);
            DateHeure.appendChild(document.createTextNode(post.date));
            postUniqueConteneur.appendChild(DateHeure);

            // Ajouter le lieu de l'événement
            const lieu = document.createElement('p');
            const boldText2 = document.createElement('strong');
            boldText2.textContent = "Lieu : ";
            lieu.appendChild(boldText2);
            lieu.appendChild(document.createTextNode(post.Lieu));
            postUniqueConteneur.appendChild(lieu);

            // Ajouter le conteneur de post à la div principale
            postDiv.appendChild(postUniqueConteneur);
        });

    } catch (error) {
        console.error('Erreur :', error);
    }
}

fetchUserPosts();
