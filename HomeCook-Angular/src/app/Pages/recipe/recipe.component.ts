import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {

  // Carga un template y lo inserta en un elemento del DOM
  loadTemplate(fileName: string, id: string, callback?: () => void): void {
    fetch(fileName)
      .then((res) => res.text())
      .then((text) => {
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = text;
        }
        if (callback) {
          callback();
        }
      })
      .catch((error) => console.error('Error al cargar el template:', error));
  }

  // Método para cargar templates desde una fuente
  loadTemplateFromSource(source: string, id: string): void {
    this.loadTemplate(source, id);
  }

  // Carga recetas recomendadas en una sección del DOM
  loadRecomendations(tab: string): void {
    const listOfRecipes = document.getElementById('recommendations_iframe');
    if (listOfRecipes) {
      listOfRecipes.innerHTML = ""; // Limpia el área de recetas recomendadas

      fetch('http://localhost:3000/Recipes')
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al cargar las recetas.');
          }
          return response.json();
        })
        .then((recipes) => {
          recipes.forEach((recipe: any) => {
            const recipeElement = document.createElement('div');
            recipeElement.classList.add('recipe');

            recipeElement.innerHTML = `
              <div class="recipe-container">
                <div class="recipe-card">
                  <img src="${recipe.Image !== "/" ? recipe.Image : "Images/img.png"}" alt="Recipe Image">
                  <div class="recipe-overlay">
                    <div class="time">${recipe.Time}</div>
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
        })
        .catch((error) => {
          console.error('Error al cargar las recetas recomendadas:', error);
          if (listOfRecipes) {
            listOfRecipes.innerHTML = '<p>Error al cargar las recetas preferidas.</p>';
          }
        });
    }
  }

  // Carga información del contenido (como ingredientes y pasos)
  loadContent(): void {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (!id) {
      console.error("No se encontró el parámetro ID en la URL.");
      return;
    }

    fetch(`http://localhost:3000/Recipes/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al cargar la receta con ID ${id}`);
        }
        return res.json();
      })
      .then((recipe) => {
        const title = document.getElementById("RecipeTitle");
        const image = document.getElementById("MainImage") as HTMLImageElement;
        const ingredientList = document.getElementById("ingredient-list");
        const stepList = document.getElementById("bloque_de_pasos");

        if (title) title.textContent = recipe.name;
        if (image) image.src = recipe.Image;

        if (ingredientList) {
          ingredientList.innerHTML = ""; // Limpia la lista de ingredientes
          recipe.Ingredients.forEach((ingredient: any) => {
            const ingredientElement = document.createElement('li');
            ingredientElement.classList.add('ingredient');
            ingredientElement.textContent = `${ingredient.Ammount} ${ingredient.Ingredient}`;
            ingredientList.appendChild(ingredientElement);
          });
        }

        if (stepList) {
          stepList.innerHTML = ""; // Limpia la lista de pasos
          recipe.Steps.forEach((step: any) => {
            const stepElement = document.createElement('div');
            stepElement.classList.add('steps');

            stepElement.innerHTML = `
              <div>
                <header>
                  <h1 class="title-step">${step.title}</h1>
                </header>
                <figure>
                  <img src="${step.Image}" width="400">
                </figure>
                <h2 class="text-step">${step.Desciption}</h2>
              </div>`;
            stepList.appendChild(stepElement);
          });
        }
      })
      .catch((error) => {
        console.error('Error al cargar el contenido de la receta:', error);
      });
  }
}
