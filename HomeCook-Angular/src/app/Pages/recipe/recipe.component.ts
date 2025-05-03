import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../../Services/firestore.service';
import { ItemComponent } from '../../item/item.component';
import { NgForOf, CommonModule } from '@angular/common';
import { StepsOfRecipesComponent } from '../../steps-of-recipes/steps-of-recipes.component';

interface Recipe {
  id: string;
  name: string;
  Image: string;
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
  standalone: true,
  imports: [CommonModule, ItemComponent, StepsOfRecipesComponent]
})
export class RecipeComponent implements OnInit {
  recipe: any = {};
  recommendations: any[] = [];
  stepsOfRecipe: any[] = [];
  selectedRating: number = 0;
  isLiked: boolean = false;
  isSaved: boolean = false;
  shareMenuVisible: boolean = false;
  recipeUrl: string = '';
  likedRecipes: any[] = [];
  savedRecipes: any[] = [];

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Suscribirse a los cambios en los query params
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadContent(id);
      } else {
        console.error('No se encontró el parámetro ID en la URL.');
      }
    });

    this.loadRecomendations();
    this.loadSavedRecipes();
    this.loadLikedRecipes();
  }

  loadContent(id: string): void {
    this.firestoreService.getRecipeById(id).then((recipe) => {
      if (!recipe) {
        console.error(`No se encontró la receta con ID ${id}.`);
        return;
      }

      this.recipe = recipe;
      this.stepsOfRecipe = recipe.Steps || [];
      this.recipeUrl = window.location.href;

      this.checkIfLiked();
      this.isSaved = this.savedRecipes.some(r => r.id === this.recipe.id);

      window.scrollTo({ top: 0, behavior: 'smooth' });

      console.log('Receta cargada:', this.recipe);
      console.log('Pasos cargados:', this.stepsOfRecipe);
    }).catch((error) => {
      console.error('Error al cargar el contenido de la receta:', error);
    });
  }

  loadRecomendations(): void {
    this.firestoreService.getRecipes().subscribe(
      (recipes) => {
        this.recommendations = recipes;
        console.log('Recomendaciones cargadas:', this.recommendations);
      },
      (error) => {
        console.error('Error al cargar las recomendaciones:', error);
      }
    );
  }

  setRating(rating: number): void {
    this.selectedRating = rating;
    console.log('Valoración seleccionada:', this.selectedRating);
  }

  toggleLike(): void {
    this.isLiked = !this.isLiked;
    let savedLikes = localStorage.getItem('likedRecipes');
    let likedRecipes: Recipe[] = savedLikes ? JSON.parse(savedLikes) : [];

    if (this.isLiked) {
      if (!likedRecipes.some((r: Recipe) => r.id === this.recipe.id)) {
        likedRecipes.push(this.recipe);
      }
    } else {
      likedRecipes = likedRecipes.filter((r: Recipe) => r.id !== this.recipe.id);
    }

    localStorage.setItem('likedRecipes', JSON.stringify(likedRecipes));
  }

  checkIfLiked(): void {
    let savedLikes = localStorage.getItem('likedRecipes');
    let likedRecipes: Recipe[] = savedLikes ? JSON.parse(savedLikes) : [];
    this.isLiked = likedRecipes.some((r: Recipe) => r.id === this.recipe.id);
  }

  loadLikedRecipes(): void {
    const savedLikes = localStorage.getItem('likedRecipes');
    this.likedRecipes = savedLikes ? JSON.parse(savedLikes) : [];
  }

  toggleSave(): void {
    this.isSaved = !this.isSaved;
    let savedData = localStorage.getItem('savedRecipes');
    let savedRecipes: Recipe[] = savedData ? JSON.parse(savedData) : [];

    if (this.isSaved) {
      if (!savedRecipes.some((r: Recipe) => r.id === this.recipe.id)) {
        savedRecipes.push(this.recipe);
      }
    } else {
      savedRecipes = savedRecipes.filter((r: Recipe) => r.id !== this.recipe.id);
    }

    localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
  }

  loadSavedRecipes(): void {
    const savedData = localStorage.getItem('savedRecipes');
    this.savedRecipes = savedData ? JSON.parse(savedData) : [];
  }

  toggleShareMenu(): void {
    this.shareMenuVisible = !this.shareMenuVisible;
  }

  copyLink(): void {
    navigator.clipboard.writeText(this.recipeUrl).then(() => {
      console.log('🔗 Enlace copiado:', this.recipeUrl);
      alert('Enlace copiado al portapapeles!');
    });
  }

  protected readonly StepsOfRecipesComponent = StepsOfRecipesComponent;
}
