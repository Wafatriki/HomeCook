import { Component, OnInit } from '@angular/core';
import {ItemComponent} from '../item/item.component';
import {NgForOf} from '@angular/common';
import {Router} from '@angular/router';
import {FirestoreService} from '../Services/firestore.service';

@Component({
  selector: 'app-list-of-recipes',
  imports: [
    ItemComponent,
    NgForOf,

  ],
  standalone: true,
  templateUrl: './list-of-recipes.component.html',
  styleUrl: './list-of-recipes.component.css'
})
export class ListOfRecipesComponent implements OnInit {
  constructor(private firestoreService: FirestoreService, private router: Router) { }
  recipes: any[] = [];
  ngOnInit() {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get('filter'); // Obtén el ID de la receta desde la URL
    if (filter === "all") {
      this.loadAllRecipes();
    }
  }
  loadAllRecipes() {
    this.firestoreService.getRecipes().subscribe(
      (recipes) => {
        this.recipes = recipes; // Asigna las recetas al array recommendations
        console.log('Recomendaciones cargadas:', this.recipes); // Depuración
      },
      (error) => {
        console.error('Error al cargar las recomendaciones:', error);
      }
    );
    return;
  }
}
