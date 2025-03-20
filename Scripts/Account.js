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
                        <img src="${recipe.image}" alt="${recipe.title}" class="recipe-image">
                        <h3>${recipe.title}</h3>
                        <p>${recipe.description}</p>
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