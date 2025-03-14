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

function setValidity(){
    var pass = document.getElementById("new-password");
    pass.addEventListener("input", function(evt){
        var oldPass = document.getElementById("current-password");
        var valueOldPass = oldPass.value;
        if (pass.value === oldPass.value) {
            pass.setCustomValidity("");
        }else{
            pass.setCustomValidity("Las contraseñas no coinciden");
        }
    });
}

function loadTemplateFromSource(source, id){
    loadTemplate(source, id);
}