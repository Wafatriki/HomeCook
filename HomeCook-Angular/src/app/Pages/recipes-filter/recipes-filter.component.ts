import { Component } from '@angular/core';
import {ListOfRecipesComponent} from '../../list-of-recipes/list-of-recipes.component';

@Component({
  selector: 'app-recipes-filter',
  templateUrl: './recipes-filter.component.html',
  imports: [
    ListOfRecipesComponent
  ],
  styleUrls: ['./recipes-filter.component.css']
})
export class RecipesFilterComponent {
  "TiposDeReceta": [
    {
      "Name": "Italiana",
      "Image": "Images/pizza.png",
      "id": "1"
    },
    {
      "Name": "Pasta",
      "Image": "Images/boloñesa.png",
      "id": "2"
    },
    {
      "Name": "Caliente",
      "Image": "Images/soup.png",
      "id": "3"
    },
    {
      "Name": "Dulce",
      "Image": "Images/tiramisu.png",
      "id": "4"
    }
  ];
  constructor() {}

  ngOnInit(): void {}

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

  // Método para cargar un template desde una fuente
  loadTemplateFromSource(source: string, id: string): void {
    this.loadTemplate(source, id);
  }

  // Carga el contenido según la pestaña y el filtro
  loadContent(tab: string): void {
    const params = new URLSearchParams(window.location.search);
    const filter = params.get("filter");
    const contentArea = document.getElementById(tab);

    if (!contentArea) {
      console.error(`No se encontró el contenedor para la pestaña: ${tab}`);
      return;
    }

    if (filter === "all") {
      contentArea.innerHTML = ""; // Limpia el área de contenido
      fetch('http://localhost:3000/Recipes') // URL del JSON Server
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
            contentArea.appendChild(recipeElement);
          });
        })
        .catch((error) => {
          console.error('Error al cargar las recetas:', error);
          contentArea.innerHTML = '<p>Error al cargar las recetas guardadas.</p>';
        });
    } else {
      contentArea.innerHTML = ""; // Limpia el área de contenido
      let count = 0;

      fetch('http://localhost:3000/Recipes') // URL del JSON Server
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error al cargar las recetas.');
          }
          return response.json();
        })
        .then((recipes) => {
          recipes.forEach((recipe: any) => {
            if (recipe.Tags.toLowerCase().includes(filter || "")) {
              count++;
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
              contentArea.appendChild(recipeElement);
            }
          });

          if (count === 0) {
            const err = document.createElement('h1');
            err.textContent = `No se han encontrado recetas con el filtro: ${filter}`;
            contentArea.appendChild(err);
          }
        })
        .catch((error) => {
          console.error('Error al cargar las recetas:', error);
          contentArea.innerHTML = '<p>Error al cargar las recetas guardadas.</p>';
        });
    }
  }
}
