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
function loadContent(tab) {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
    const contentArea = document.getElementById(tab);
    if (filter === "all") {
        const contentArea = document.getElementById(tab);
        contentArea.innerHTML = ""; // Limpia el área de contenido antes de cargar nuevas recetas
        // Verifica si la pestaña es "guardado"
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
                            <a href="Recipe.html?id=${recipe.id}">
                            <div class="recipe-container">
                            
                                <div class="recipe-card">
                              
                                    <img src="${recipe.Image !== "/" ? recipe.Image : "Images/img.png"}" alt="Recipe Image">
                                    <div class="recipe-overlay">
                                        <div class="time">${recipe.Time}</div>
                                        <div class="vegetarian">Vegetariano</div>
                                    </div>
                                    <div class="recipe-info">
                                        <h3>${recipe.name}</h3>
                                        <p>${recipe.Creator}</p>
                                    </div>
                                </div>
                            </div>
                            </a>
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

    }else{
        const contentArea = document.getElementById(tab);
        contentArea.innerHTML = ""; // Limpia el área de contenido antes de cargar nuevas recetas
        let count = 0;
        fetch('http://localhost:3000/Recipes') // URL del JSON Server
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error');
                }
                return response.json();
            })
            .then(recipes => {
                recipes.forEach(recipe => {
                    if (recipe.Tags.toLowerCase().includes(filter)){
                        count = count + 1;
                    const recipeElement = document.createElement('div');
                    recipeElement.classList.add('recipe');

                    recipeElement.innerHTML = `
                        <html>
                            <head>
                                <link rel="stylesheet" href="../Styles/item.css">
                            </head>
                            <body>
                            <a href="Recipe.html?id=${recipe.id}">
                            <div class="recipe-container">
                            
                                <div class="recipe-card">
                              
                                    <img src="${recipe.Image !== "/" ? recipe.Image : "Images/img.png"}" alt="Recipe Image">
                                    <div class="recipe-overlay">
                                        <div class="time">${recipe.Time}</div>
                                        <div class="vegetarian">Vegetariano</div>
                                    </div>
                                    <div class="recipe-info">
                                        <h3>${recipe.name}</h3>
                                        <p>${recipe.Creator}</p>
                                    </div>
                                </div>
                            </div>
                            </a>
                            </body>
                            </html>
                    `;
                    contentArea.appendChild(recipeElement);
                    }
                });
                if (count === 0){
                    const err = document.createElement('h1');
                    err.textContent = `No se han encontrado recetas con ${filter}`;
                    contentArea.appendChild(err);
                }
            })
            .catch(error => {
                console.error('Error al cargar las recetas:', error);
                contentArea.innerHTML = '<p>Error al cargar las recetas guardadas.</p>';
            });

    }
}
function loadTemplateFromSource(source, id) {
    loadTemplate(source, id);
}