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

function Log_In_Listener(){
    document.getElementById("login").addEventListener("submit", function(event){
        event.preventDefault();
        fetch("http://localhost:3000/users/1")
            .then(res => res.json())
            .then(User => {
                var introducedPass= document.getElementById('password');
                var introducedUser = document.getElementById('username');
                console.log(introducedPass.value);
                console.log(User.PassWord);
                var form=document.getElementById('password');
                if (introducedPass.value === User.PassWord && introducedUser.value === User.email ){
                    window.location.replace("Account.html");
                }else{

                }

            }).catch(
            err => console.log(err)
        );
    });
}