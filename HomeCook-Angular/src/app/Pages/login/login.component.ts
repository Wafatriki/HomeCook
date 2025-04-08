import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Request} from 'express';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../Services/authentication.service'
import { Router } from '@angular/router'
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  private name: string | null = localStorage.getItem('name');
  private url: string | null = localStorage.getItem('url');
  private id: string | null = localStorage.getItem('id');
  private source: string | null = localStorage.getItem('source');

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    this.authService.login(this.email, this.password).then(r => {
      this.router.navigate(['account']);
    });
  }
  ngOnInit() {
    if (this.name && this.url && this.id) {
      this.loadTemplate(this.url, this.id, () => {
        console.log('Template loaded successfully');
      });
    } else {
      console.error('Missing required data from localStorage');
    }
    if (this.source && this.id) {
      this.loadTemplateFromSource(this.source, this.id);
    } else {
      console.error('Missing required data from localStorage');
    }
    this.isLoggedIn();
  }

  loadTemplate(fileName: string, id: string, callback?: () => void) {
    fetch(fileName).then((res) => {
      return res.text();
    }).then((text) => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = text;
      }

      if (callback) {
        callback();
      }
    })
  }

  loadTemplateFromSource(source: string, id: string){
    this.loadTemplate(source, id);
  }

  isLoggedIn(){
    fetch("http://localhost:3000/users/1")
      .then(res => res.json()).then(User => {
      if(User.isLoggedIn){
      }
    }).catch(err => console.log(err));
  }

}
/*

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
 */
