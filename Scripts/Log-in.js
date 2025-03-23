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
        event.preventDefault(); // Evitar envío por defecto del formulario

        // Obtener valores ingresados por el usuario
        const introducedPass = document.getElementById('password').value;
        const introducedUser = document.getElementById('username').value;

        // Consultar los datos del usuario desde JSON Server
        fetch("http://localhost:3000/users/1")
            .then(res => res.json())
            .then(User => {
                // Verificar credenciales
                if (introducedPass === User.PassWord && introducedUser === User.email) {
                    // Actualizar automáticamente el estado a "isLoggedIn: true" en el servidor
                    fetch("http://localhost:3000/users/1", {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ isLoggedIn: true }) // Cambiar el estado de inicio de sesión
                    })
                        .then(() => {
                            // Redirigir al perfil después de actualizar el estado
                            window.location.replace("Account.html");
                        })
                        .catch(err => console.error("Error al actualizar el estado del usuario:", err));
                } else {
                    // Mostrar mensaje de error si las credenciales no son correctas
                    alert("Usuario o contraseña incorrectos. Por favor, inténtelo nuevamente.");
                }
            })
            .catch(err => console.error("Error al obtener los datos del usuario:", err));
    });

}