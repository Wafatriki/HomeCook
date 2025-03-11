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
function init() {
    loadTemplate('Templates/header.html', 'main_header');
    loadTemplate('Templates/footer.html', 'main_footer');
}
function load_template_from_page(template_name, id, callback) {

}
function loadContent(tab) {
    const contentArea = document.getElementById('content-area');
    const fileName = "./Templates/ListOfRecipes.html";
    fetch(fileName)
        .then(response => response.text())
        .then(data => {
            contentArea.innerHTML = data;
            const recipes = contentArea.querySelectorAll('.recipe');
            const numberOfClones = 3;

            for (let i = 0; i < numberOfClones; i++) {
                recipes.forEach(recipe => {
                    const clone = recipe.cloneNode(true);
                    contentArea.appendChild(clone);
                });
            }
        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
            contentArea.innerHTML = '<p>Error al cargar el contenido.</p>';
        });
}