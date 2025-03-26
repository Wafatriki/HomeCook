function loadTemplate(fileName, id, callback) {

    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        document.getElementById(id).innerHTML = text;
        //console.log(text)

        if(callback){
            callback();
        }
    })
}
function loadUserProfile() {
    fetch('http://localhost:3000/users/1') // Asegúrate de que esta URL funciona
        .then(res => {
            if (!res.ok) {
                throw new Error('No se pudo cargar el usuario. Verifica JSON Server.');
            }
            return res.json();
        })
        .then(User => {
            if (User.isLoggedIn) {
                document.querySelectorAll('.info .text-field')[0].textContent = User.UserName;
                document.querySelectorAll('.info .text-field')[1].textContent = User.email;
            } else {
                document.querySelectorAll('.info .text-field')[0].textContent = "Nombre de usuario";
                document.querySelectorAll('.info .text-field')[1].textContent = "Email";
            }
        })
        .catch(err => console.error("Error al cargar los datos del usuario:", err));
}


function loadTemplateFromSource(source, id){
    loadTemplate(source, id);
}

function loadContent(tab) {
    const contentArea = document.getElementById('content-area');
    contentArea.innerHTML = ""; // Limpia el área de contenido antes de cargar nuevas recetas

    // Verifica si la pestaña es "guardado"
    if (tab === "guardado") {
        fetch('http://localhost:3000/Recipes') // URL del JSON Server
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(recipes => {
                recipes.forEach(recipe => {
                    const recipeElement = document.createElement('div');
                    recipeElement.classList.add('recipe');

                    recipeElement.innerHTML = `
                        <html>
                            <head>
                                <link rel="stylesheet" href="../Styles/item.css">
                            </head>
                            <body>
                            
                            <div class="recipe-container">
                            
                                <div class="recipe-card">
                                    <img src="../Images/img.png" alt="Recipe Image">
                                    <div class="recipe-overlay">
                                        <div class="time">30 min</div>
                                        <div class="vegetarian">Vegetariano</div>
                                    </div>
                                    <div class="recipe-info">
                                        <h3>Nombre</h3>
                                        <p>Autor</p>
                                    </div>
                                </div>
                            </div>
                            </body>
                            </html>
                    `;
                    contentArea.appendChild(recipeElement);
                });
            })
            .catch(error => {
                console.error('Error al cargar las recetas:', error);
                contentArea.innerHTML = '<p>Error al cargar las recetas guardadas.</p>';
            });
    }

}