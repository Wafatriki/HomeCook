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
function anadirlistener(){

}
var Contraseña = document.getElementById("new-password");
Contraseña.addEventListener("input", function(evt){

});

function loadTemplateFromSource(source, id){
    loadTemplate(source, id);
}