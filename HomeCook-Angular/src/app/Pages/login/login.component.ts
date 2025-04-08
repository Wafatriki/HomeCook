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
  private mail: string | null = localStorage.getItem('mail');
  private id: string | null = localStorage.getItem('id');
  private authToken: string | null = localStorage.getItem('authToken');

  constructor(private authService: AuthService, private router: Router) {}
  onSubmit() {
    this.authService.login(this.email, this.password).then(r => {
      const user = r.user;
      localStorage.setItem('mail', user.email || '');
      localStorage.setItem('id', user.uid);
      user.getIdToken().then(idToken => {
        localStorage.setItem('authToken',idToken);
      })

      this.router.navigate(['account']);
    });
  }
  ngOnInit() {
    if (this.isLoggedIn()){
      this.router.navigate(['account']);
    }
  }



  isLoggedIn(){
    return localStorage.getItem('authToken') !== null;
  }

}
/*

function Log_In_Listener() {
    document.getElementById("login").addEventListener("submit", function(event) {
        event.preventDefault();

        const introducedPass = document.getElementById('password').value;
        const introducedUser = document.getElementById('usermail').value;

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
