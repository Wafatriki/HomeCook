function loadTemplate(fileName, id, callback) {

    fetch(fileName).then((res) => {
        return res.text();
    }).then((text) => {
        document.getElementById(id).innerHTML = text;


        if(callback){
            callback();
        }
    })
}

function init() {
    loadTemplate('Templates/footer.html', 'footer');
}

function loadTemplateFromSource(source, id){
    loadTemplate(source, id);
}
function loadRecipeOfTheDay(){
    fetch("http://localhost:3000/RecipeOfTheDay/")
        .then(res => res.json())
        .then(recipe => {
            var recipeOfTheDayLink = document.getElementById("paginaRecetaPrincipal");
            var RecipeOfTheDayImage = document.getElementById("Imagen_Receta_Principal");
            var RecipeOfTheDayTitle =document.getElementById('Recipe_Of_The_Day_Title');
            var RecipeOfTheDayDescription =document.getElementById('Recipe_Of_The_Day_Text');
            recipeOfTheDayLink.href="Recipe.html?id="+ recipe[0].id;
            RecipeOfTheDayImage.src = recipe[0].Image;
            RecipeOfTheDayImage.href= "Chocolate Vegano";
            RecipeOfTheDayTitle.textContent= recipe[0].Name;
            RecipeOfTheDayDescription.textContent= recipe[0].Description;
        }).catch()
}
function loadTiposDeReceta() {
    fetch("http://localhost:3000/TiposDeReceta/")
        .then(res => res.json())
        .then(recipe => {
            const textElements = document.querySelectorAll(".text_type");

            textElements.forEach((element, index) => {
                if (recipe[index]) {
                    element.textContent = recipe[index].Name;
                }
            });
            const imageElements = document.querySelectorAll(".icon_type img");

            imageElements.forEach((img, index) => {
                if (recipe[index]) {
                    img.src = recipe[index].Image;
                    img.alt = recipe[index].Name;
                }
            });
        })
        .catch(error => console.error("Error fetching recipes:", error));
}

function loadTiposDeIngredients() {
    fetch("http://localhost:3000/TiposDeIngredientes/")
        .then(res => res.json())
        .then(ingredients => {
            ingredients.forEach(ingredient => {
                const textElement = document.querySelector(`.text_type[data-id="${ingredient.id}"]`);
                if (textElement) {
                    textElement.textContent = ingredient.Name;
                }

                const imageElement = document.querySelector(`.TiposDeReceta${ingredient.id}`);
                if (imageElement) {
                    imageElement.src = ingredient.Image;
                    imageElement.alt = ingredient.Name;
                }
            });
        })
        .catch(error => console.error("Error fetching ingredients:", error));
}


function loadContent(tab) {
    const listOfRecipes = document.getElementById('ListOfRecipes');
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
                                <link rel="stylesheet" href="Styles/item.css">
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

function iniciarMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function () {
            navMenu.classList.toggle("show");
        });
    }
}

function cargaHeader(){
    fetch('Templates/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
        })
        .then(() => {
            iniciarMenu(); // Llama a la función del menú después de cargar el header
        })
        .catch(error => console.error('Error al cargar el header:', error));
}
function load_template_from_page(template_name, id, callback) {

}