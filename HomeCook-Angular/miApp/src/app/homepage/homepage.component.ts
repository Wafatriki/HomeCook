import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FirestoreService } from '../Services/firestore.service';
import { ItemComponent } from '../item/item.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule, ItemComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  recipeOfTheDay: any = {};
  recipeTypes: any[] = [];
  ingredientTypes: any[] = [];
  favoriteRecipes: any[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.firestoreService.getRecipeOfTheDay().then(recipe => {
      this.recipeOfTheDay = recipe;
    });

    this.firestoreService.getRecipeTypes().subscribe(types => {
      this.recipeTypes = types;
    });

    this.firestoreService.getIngredientTypes().subscribe(ingredients => {
      this.ingredientTypes = ingredients;
    });

    this.firestoreService.getRecipes().subscribe(recipes => {
      this.favoriteRecipes = recipes;
    });
  }

  goto(target: string, param?: any): void {
    this.router.navigate([target], { queryParams: param });
  }
}
