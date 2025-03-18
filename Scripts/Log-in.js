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
function LogIn(){
    window.location.replace("Account.html");
    fetch("http://localhost:3000/users/1")
    .then(res => res.json())
    .then(User => {
        var introducedPass= document.getElementById('password');
        var introducedUser = document.getElementById('username');
        var form=document.getElementById('password');
        if (introducedPass.innerHTML === User.PassWord && introducedUser.innerHTML === User.email ){
            window.location.replace("Account.html");
        }else{

        }

    }).catch(
        err => console.log(err)
    )
}