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

function init() {
    loadTemplate('Templates/header.html', 'header');
    loadTemplate('Templates/footer.html', 'footer');
}

function loadTemplateFromSource(source, id){
    loadTemplate(source, id);
}
function loadRecipeOfTheDay(){
    fetch("http://localhost:3000/RecipeOfTheDay/")
        .then(res => res.json())
        .then(recipe => {
            var RecipeOfTheDayTitle =document.getElementById('Recipe_Of_The_Day_Title');
            var RecipeOfTheDayDescription =document.getElementById('Recipe_Of_The_Day_Text');
            RecipeOfTheDayTitle.textContent= recipe[0].Name;
            RecipeOfTheDayDescription.textContent= recipe[0].Description;
        }).catch()
}
function load_template_from_page(template_name, id, callback) {

}