import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../Services/firestore.service';
import {ItemComponent} from '../../item/item.component';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  imports: [
    ItemComponent,
    NgForOf
  ]
})
export class RecipeComponent implements OnInit {
  recipe: any = {};
  recommendations: any[] = []

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.loadContent();
    this.loadRecomendations();

  }

  // Método para cargar una receta específica desde Firestore
  loadContent(): void {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id'); // Obtiene el ID de la receta desde la URL

    if (!id) {
      console.error('No se encontró el parámetro ID en la URL.');
      return;
    }

    this.firestoreService.getRecipeById(id).then((recipe) => {
      if (!recipe) {
        console.error(`No se encontró la receta con ID ${id}.`);
        return;
      }

      // Asigna los datos de la receta al objeto recipe
      this.recipe = recipe;
      console.log('Receta cargada:', this.recipe);
    }).catch((error) => {
      console.error('Error al cargar el contenido de la receta:', error);
    });
  }

  loadRecomendations(): void {
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

}
