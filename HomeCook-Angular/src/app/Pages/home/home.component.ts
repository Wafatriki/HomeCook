import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirestoreService } from '../../Services/firestore.service';
import { ItemComponent } from '../../item/item.component';
import {Router} from '@angular/router';

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

  constructor(private firestoreService: FirestoreService, private router: Router) {}

  ngOnInit(): void {
    this.firestoreService.getRecipeOfTheDay().then(recipe => {
      this.recipeOfTheDay = recipe;
    });

    //tipos de recetas
    this.firestoreService.getRecipeTypes().subscribe(types => {
      this.recipeTypes = types;
    });

    //tipos de ingredientes
    this.firestoreService.getIngredientTypes().subscribe(ingredients => {
      this.ingredientTypes = ingredients;
    });

    //recetas favoritas
    this.firestoreService.getRecipes().subscribe(recipes => {
      this.favoriteRecipes = recipes;
    });
  }

}

