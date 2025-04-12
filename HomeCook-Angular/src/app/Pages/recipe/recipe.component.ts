import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../Services/firestore.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css'],
})
export class RecipeComponent implements OnInit {
  recipe: any = {}; // Objeto que almacenará los datos de la receta cargada

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.loadContent();
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
    const listOfRecipes = document.getElementById('recommendations_iframe');
    if (listOfRecipes) {
      listOfRecipes.innerHTML = ""; // Limpia el área de recetas recomendadas

      this.firestoreService.getRecipes().subscribe(recipes => {
        recipes.forEach((recipe: any) => {
          const recipeElement = document.createElement('div');
          recipeElement.classList.add('recipe');

          recipeElement.innerHTML = `
          <div class="recipe-container">
            <div class="recipe-card">
              <img src="${recipe.Image || 'Images/img.png'}" alt="Recipe Image">
              <div class="recipe-overlay">
                <div class="time">${recipe.time}</div>
                <div class="vegetarian">Vegetariano</div>
              </div>
              <div class="recipe-info">
                <h3>${recipe.name}</h3>
                <p>${recipe.Creator}</p>
              </div>
            </div>
          </div>
        `;
          listOfRecipes.appendChild(recipeElement);
        });
      }, error => {
        console.error('Error al cargar las recetas recomendadas:', error);
        listOfRecipes.innerHTML = '<p>Error al cargar las recetas preferidas.</p>';
      });
    }
  }

}
