// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { app } from '../firebase/firebase.config';
import { BehaviorSubject } from 'rxjs';

const auth = getAuth(app);

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Aseguramos que no inicie como undefined o null
  private authTokenSubject = new BehaviorSubject<string | null>(
    typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
  );
  authToken$ = this.authTokenSubject.asObservable();

  setAuthToken(token: string | null) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
    this.authTokenSubject.next(token);
  }


  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  logout() {
    return signOut(auth);
  }
}
