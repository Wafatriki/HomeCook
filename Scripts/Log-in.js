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
function Log_In_Listener() {
    document.getElementById("login").addEventListener("submit", function(event) {
        event.preventDefault();

        const introducedPass = document.getElementById('password').value;
        const introducedUser = document.getElementById('username').value;

        fetch("http://localhost:3000/users/1")
            .then(res => res.json())
            .then(User => {
                if (introducedPass === User.PassWord && introducedUser === User.email) {
                    fetch("http://localhost:3000/users/1", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ isLoggedIn: true })
                    })
                        .then(() => {
                            window.location.replace("Account.html");
                        })
                        .catch(err => console.error("Error al actualizar el estado del usuario:", err));
                } else {
                    alert("Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.");
                }
            })
            .catch(err => console.error("Error al obtener los datos del usuario:", err));
    });

}