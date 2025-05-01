// src/app/components/header/header.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../Services/authentication.service';
import {FormsModule} from '@angular/forms';
import {SearchComponent} from '../search/search.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [CommonModule, FormsModule, SearchComponent]
})
export class HeaderComponent implements OnInit, OnDestroy {
  authToken: string | null = null;
  searchQuery: string = '';

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.authToken$.subscribe(token => {
      // Si el token es una cadena vacía, lo consideramos como null
      this.authToken = token || null;
    });
  }
  onSearch(): void {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/recipes-filter'], { queryParams: { search: this.searchQuery } });
    }
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
    this.router.navigate(['/SignIn']);
  }
  goToAccount() {
    this.router.navigate(['/account']);
  }
  goTo(target : string) {
    const [path, query] = target.split('?');
    const queryParams = Object.fromEntries(new URLSearchParams(query || ''));
    this.router.navigate([path], { queryParams });
  }
}
