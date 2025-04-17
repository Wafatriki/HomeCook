import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../Services/firestore.service';
import {ItemComponent} from '../../item/item.component';
import {NgForOf} from '@angular/common';
import {StepsOfRecipesComponent} from '../../steps-of-recipes/steps-of-recipes.component';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  imports: [
    ItemComponent,
    NgForOf,
    StepsOfRecipesComponent
  ]
})
export class RecipeComponent implements OnInit {
  recipe: any = {};
  recommendations: any[] = []
  stepsOfRecipe: any[] = []

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.loadContent();
    this.loadRecomendations();

  }

  loadContent(): void {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id'); // Obtén el ID de la receta desde la URL

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
      this.stepsOfRecipe = recipe.Steps || [];
      console.log('Receta cargada:', this.recipe); // Depura la receta completa
      console.log('Pasos cargados:', this.stepsOfRecipe); // Depura los pasos específicamente
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

  protected readonly StepsOfRecipesComponent = StepsOfRecipesComponent;
}
