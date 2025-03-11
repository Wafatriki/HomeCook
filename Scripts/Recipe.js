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
    loadTemplate('Templates/header.html', 'main_header');
    loadTemplate('Templates/footer.html', 'main_footer');
}

function load_template_from_page(template_name, id, callback) {

}