import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ListOfRecipesComponent} from '../../list-of-recipes/list-of-recipes.component';
import { Router } from '@angular/router'
import {AuthService} from '../../Services/authentication.service';
import {ItemComponent} from '../../item/item.component';
import {NgForOf, NgIf} from '@angular/common';
import { CommonModule} from '@angular/common';
import {FirestoreService} from '../../Services/firestore.service';


interface Recipe {
  id: string;
  name: string;
  Image: string;
}

@Component({
  selector: 'app-account',
  imports: [RouterOutlet, ListOfRecipesComponent, ItemComponent, NgForOf, NgIf, CommonModule],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  account_name: string = localStorage.getItem('mail') ?? 'invitado';
  account_email: string = localStorage.getItem('email') ?? 'Sin email';
  selectedTab: string = 'guardado';
  likedRecipes: any[] = [];
  recommendations: any[] = [];
  savedRecipes: any[] = [];

  constructor(private router: Router, private authService: AuthService,
              private firestoreService: FirestoreService ) { }
  // Carga el template desde una fuente

  loadTemplate(fileName: string, id: string, callback?: () => void): void {
    fetch(fileName)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al cargar el archivo: ${res.statusText}`);
        }
        return res.text();
      })
      .then((text) => {
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = text;
        }
        if (callback) {
          callback();
        }
      })
      .catch((err) => console.error('Error al cargar el template:', err));
  }
  navigate(target:string){
    this.router.navigate([target]);
  }
  // Carga los datos del perfil del usuario
  loadUserProfile(): void {
    fetch('http://localhost:3000/users/1') // URL del JSON Server
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudo cargar el usuario. Verifica JSON Server.');
        }
        return res.json();
      })
      .then((user) => {
        if (user.isLoggedIn) {
          document.querySelectorAll('.info .text-field')[0].textContent = user.UserName;
          document.querySelectorAll('.info .text-field')[1].textContent = user.email;
        } else {
          document.querySelectorAll('.info .text-field')[0].textContent = "Nombre de usuario";
          document.querySelectorAll('.info .text-field')[1].textContent = "Email";
        }
      })
      .catch((err) => console.error("Error al cargar los datos del usuario:", err));
  }


  // Función para cerrar sesión
  logOut(): void {
    this.authService.setAuthToken(null);
    this.authService.logout();
    this.router.navigate(['']);
  }

  // Carga el contenido dependiendo de la pestaña seleccionada
  loadContent(tab: string): void {
    if (tab != null) {

    }
    this.selectedTab = tab;
    this.loadLikedRecipes();
    this.loadSavedRecipes();
    this.firestoreService.getRecipes().subscribe(
      (recipes) => {
        this.recommendations = recipes; // Asigna las recetas al array recommendations
        console.log('Recomendaciones cargadas:', this.recommendations); // Depuración
      },
      (error) => {
        console.error('Error al cargar las recomendaciones:', error);
      }
    );
  }

  ngOnInit(): void {
    this.loadLikedRecipes();
    this.loadSavedRecipes();
    this.account_name = localStorage.getItem('name') ?? 'Invitado';
  }

  loadSavedRecipes(): void {
    const savedData = localStorage.getItem('savedRecipes');
    this.savedRecipes = savedData ? JSON.parse(savedData) : [];
  }

  loadLikedRecipes(): void {
    const savedLikes = localStorage.getItem('likedRecipes');
    this.likedRecipes = savedLikes ? JSON.parse(savedLikes) : [];
  }
}
