// src/app/components/header/header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  authToken: string | null = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authToken$.subscribe(token => {
      // Si el token es una cadena vacía, lo consideramos como null
      this.authToken = token || null;
    });
  }

  ngOnDestroy(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.handleStorageChange);
    }
  }

  handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'authToken' && typeof window !== 'undefined') {
      this.authToken = window.localStorage.getItem('authToken') || null;
    }
  };

  goToLogin() {
    this.router.navigate(['/login']);
  }

  goToSignIn() {
    this.router.navigate(['/Sign-In']);
  }
}
