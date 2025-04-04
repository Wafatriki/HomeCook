import { Component, OnInit } from '@angular/core';
import {Request} from 'express';

@Component({
  selector: 'edit-profile',
  imports: [],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  private name: string | null = localStorage.getItem('name');
  private url: string | null = localStorage.getItem('url');
  private id: string | null = localStorage.getItem('id');

  ngOnInit() {
    if (this.name && this.url && this.id) {
      this.loadTemplate(this.url, this.id, () => {
        console.log('Template loaded successfully');
      });
    } else {
      console.error('Missing required data from localStorage');
    }
  }

  loadTemplate(fileName: string, id: string, callback?: () => void) {
     fetch(fileName).then((res) => {
      return res.text();
    }).then((text) => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = text;
      }

      if(callback){
        callback();
      }
    })
  }


  /*
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
    var save = document.getElementById("save-changes-button");
    var name = document.getElementById("name");
    var email = document.getElementById("email");

    pass.addEventListener("input", function(evt){
        var oldPass = document.getElementById("current-password");
        if (pass.value === oldPass.value) {
            pass.setCustomValidity(""); // Las contraseñas coinciden
        } else {
            pass.setCustomValidity("Las contraseñas no coinciden");
        }
    });

    save.addEventListener("click", function(evt){
        // Validar Nombre
        if (!name.value.trim()) {
            name.setCustomValidity("Por favor, ingresa tu nombre.");
        } else {
            name.setCustomValidity("");
        }

        // Validar Email
        if (!email.value.trim()) {
            email.setCustomValidity("Por favor, ingresa tu email.");
        } else if (!validateEmail(email.value.trim())) {
            email.setCustomValidity("Por favor, ingresa un email válido.");
        } else {
            email.setCustomValidity("");
        }

        // Validar Contraseñas
        var oldPass = document.getElementById("current-password");
        if (!oldPass.value.trim() || !pass.value.trim()) {
            pass.setCustomValidity("Por favor, completa ambos campos de contraseña.");
        } else if (pass.value === oldPass.value) {
            pass.setCustomValidity(""); // Las contraseñas coinciden
        } else {
            pass.setCustomValidity("Las contraseñas no coinciden.");
        }

        if (!name.checkValidity() || !email.checkValidity() || !pass.checkValidity()) {
            evt.preventDefault();
            name.reportValidity();
            email.reportValidity();
            pass.reportValidity();
        } else {
            // Si todo es válido, redirige
            window.location.href = "../Account.html";
        }
    });
}

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para validar email
    return emailRegex.test(email);
}

function loadTemplateFromSource(source, id){
    loadTemplate(source, id);
}

document.addEventListener("DOMContentLoaded", function () {
    setValidity(); // Asegura que las validaciones se configuren al cargar el DOM
});

   */




}
