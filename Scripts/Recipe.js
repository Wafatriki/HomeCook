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

function loadTemplateFromSource(source, id){
    loadTemplate(source, id);
}


function loadRecomendations(tab) {
    const listOfRecipes = document.getElementById('recommendations_iframe');
    listOfRecipes.innerHTML = ""; // Limpia el área de recetas preferidas

    fetch('http://localhost:3000/Recipes') // URL del JSON Server
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar las recetas.');
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
                              
                                    <img src="${recipe.Image !== "/"  ? recipe.Image : "Images/img.png"}" alt="Recipe Image">
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
                listOfRecipes.appendChild(recipeElement);
            });
        })
        .catch(error => {
            console.error('Error al cargar las recetas preferidas:', error);
            listOfRecipes.innerHTML = '<p>Error al cargar las recetas preferidas.</p>';
        });
}


function loadContent(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    fetch(`http://localhost:3000/Recipes/${id}`)
        .then(res => res.json())
        .then(recipe => {
            const title = document.getElementById("RecipeTitle");
            title.textContent = recipe.name;
            const image = document.getElementById("MainImage");
            image.src = recipe.Image;
            const ingredientList = document.getElementById("ingredient-list");
            const stepList = document.getElementById("bloque_de_pasos");
            while (ingredientList.firstChild) {
                ingredientList.removeChild(ingredientList.firstChild);
            }
            recipe.Ingredients.forEach(ingredient => {
                const IngredientElement = document.createElement('li');
                IngredientElement.classList.add('ingredient');
                IngredientElement.textContent = ingredient.Ammount + " " +ingredient.Ingredient;
                ingredientList.appendChild(IngredientElement);
            })
            while (stepList.firstChild) {
                stepList.removeChild(stepList.firstChild);
            }
            recipe.Steps.forEach(step => {

                const StepElement = document.createElement('div');
                StepElement.classList.add('steps');

                StepElement.innerHTML ='<html>\n' +
                    '<head>\n' +
                    '    <title>Steps of recipes</title>\n' +
                    '    <link rel="stylesheet" href="../Styles/StepsOfRecipes.css">\n' +
                    '</head>\n' +
                    '<body>\n' +
                    '<section id="main_step">\n' +
                    '    <article>\n' +
                    '        <header>\n' +
                    '            <h1 id="title" class="title-step">'+ step.title +'</h1>\n' +
                    '        </header>\n' +
                    '        <figure>\n' +
                    '            <img src='+ step.Image + ' width="400">\n' +
                    '        </figure>\n' +
                    '        <h2 class="text-step">' + step.Desciption +'</h2>\n' +
                    '    </article>\n' +
                    '</section>\n' +
                    '</body>\n' +
                    '</html>';
                stepList.appendChild(StepElement);

            });

        }).catch()

}