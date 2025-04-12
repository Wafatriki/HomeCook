import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../Services/firestore.service';
import {ItemComponent} from '../../item/item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ItemComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomePageComponent implements OnInit {
  recipeOfTheDay: any = {};
  recipeTypes: any[] = [];
  ingredientTypes: any[] = [];
  favoriteRecipes: any[] = [];

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    // Carga la receta del día
    this.firestoreService.getRecipeOfTheDay().then(recipe => {
      this.recipeOfTheDay = recipe || {
        Name: 'Sin receta',
        Description: 'No hay datos disponibles',
        Image: 'Images/Icone.png'
      };
      console.log('Receta del día:', this.recipeOfTheDay);
    });

    // Carga los tipos de recetas
    this.firestoreService.getRecipeTypes().subscribe(types => {
      this.recipeTypes = types;
      console.log('Tipos de receta:', this.recipeTypes);
    });

    // Carga los tipos de ingredientes
    this.firestoreService.getIngredientTypes().subscribe(ingredients => {
      this.ingredientTypes = ingredients;
      console.log('Tipos de ingredientes:', this.ingredientTypes);
    });

    // Carga las recetas favoritas
    this.firestoreService.getRecipes().subscribe(recipes => {
      this.favoriteRecipes = recipes;
      console.log('Recetas favoritas:', this.favoriteRecipes);
    });
  }
}
