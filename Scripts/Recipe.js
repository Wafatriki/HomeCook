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

function loadContent(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    fetch(`http://localhost:3000/Recipes/${id}`)
        .then(res => res.json())
        .then(recipe => {
            const title = document.getElementById("RecipeTitle");
            title.textContent = recipe.name;
            const image = document.getElementById("MainImage");
            image.src = "Images/Papasarrugadas.jpg";
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
                    '            <img src="../Images/img.png" width="400">\n' +
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