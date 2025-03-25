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
            var RecipeOfTheDayImage = document.getElementById("Imagen_Receta_Principal");
            var RecipeOfTheDayTitle =document.getElementById('Recipe_Of_The_Day_Title');
            var RecipeOfTheDayDescription =document.getElementById('Recipe_Of_The_Day_Text');
            RecipeOfTheDayImage.src = recipe[0].Image;
            RecipeOfTheDayImage.href= "Chocolate Vegano";
            RecipeOfTheDayTitle.textContent= recipe[0].Name;
            RecipeOfTheDayDescription.textContent= recipe[0].Description;
        }).catch()
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