import {Component, Input, NgModule, OnInit} from '@angular/core';
import {Request} from 'express';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../../Services/authentication.service'
import { Router } from '@angular/router'
import {AppComponent} from '../../app.component';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]
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
        this.authService.setAuthToken(idToken);
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
