
document.addEventListener("DOMContentLoaded", function () {
    fetch("http://localhost:3000/users/1")
        .then(res => res.json()).then(User => {
        if(User.isLoggedIn){
            const botones = document.getElementById("Log_in_Section");
            botones.innerHTML = "";
            imagen = document.createElement("li");
            imagen.innerHTML = '<a href="Account.html"> ' +
                '<img src="Images/account.png" alt="Cuenta">'+
                '</a>';
            botones.appendChild(imagen);
        }
    }).catch(err => console.log(err));
});