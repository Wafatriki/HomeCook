import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ListOfRecipesComponent} from '../../list-of-recipes/list-of-recipes.component';


@Component({
  selector: 'app-home',
  imports: [RouterOutlet, ListOfRecipesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomePageComponent implements OnInit {
  recipeOfTheDay: any = {}; // Datos de la receta del día
  recipeTypes: any[] = [];  // Tipos de recetas
  ingredientTypes: any[] = []; // Tipos de ingredientes
  favoriteRecipes: any[] = []; // Recetas favoritas

  constructor() {}

  ngOnInit(): void {
    this.loadRecipeOfTheDay();
    this.loadTiposDeReceta();
    this.loadTiposDeIngredientes();
    this.loadRecipes();
  }

  loadRecipeOfTheDay(): void {
    fetch('http://localhost:3000/RecipeOfTheDay/')
      .then(res => res.json())
      .then(recipe => {
        this.recipeOfTheDay = recipe[0];
      })
      .catch(error => console.error('Error al cargar la receta del día:', error));
  }

  loadTiposDeReceta(): void {
    fetch('http://localhost:3000/TiposDeReceta/')
      .then(res => res.json())
      .then(recipes => {
        this.recipeTypes = recipes;
      })
      .catch(error => console.error('Error al cargar tipos de recetas:', error));
  }

  loadTiposDeIngredientes(): void {
    fetch('http://localhost:3000/TiposDeIngredientes/')
      .then(res => res.json())
      .then(ingredients => {
        this.ingredientTypes = ingredients;
      })
      .catch(error => console.error('Error al cargar tipos de ingredientes:', error));
  }

  loadRecipes(): void {
    fetch('http://localhost:3000/Recipes')
      .then(res => res.json())
      .then(recipes => {
        this.favoriteRecipes = recipes;
      })
      .catch(error => console.error('Error al cargar recetas favoritas:', error));
  }

}
