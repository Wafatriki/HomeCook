import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [RouterOutlet],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  // Carga el template desde una fuente
  loadTemplate(fileName: string, id: string, callback?: () => void): void {
    fetch(fileName)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error al cargar el archivo: ${res.statusText}`);
        }
        return res.text();
      })
      .then((text) => {
        const element = document.getElementById(id);
        if (element) {
          element.innerHTML = text;
        }
        if (callback) {
          callback();
        }
      })
      .catch((err) => console.error('Error al cargar el template:', err));
  }

  // Carga los datos del perfil del usuario
  loadUserProfile(): void {
    fetch('http://localhost:3000/users/1') // URL del JSON Server
      .then((res) => {
        if (!res.ok) {
          throw new Error('No se pudo cargar el usuario. Verifica JSON Server.');
        }
        return res.json();
      })
      .then((user) => {
        if (user.isLoggedIn) {
          document.querySelectorAll('.info .text-field')[0].textContent = user.UserName;
          document.querySelectorAll('.info .text-field')[1].textContent = user.email;
        } else {
          document.querySelectorAll('.info .text-field')[0].textContent = "Nombre de usuario";
          document.querySelectorAll('.info .text-field')[1].textContent = "Email";
        }
      })
      .catch((err) => console.error("Error al cargar los datos del usuario:", err));
  }

  // Carga un template desde una fuente
  loadTemplateFromSource(source: string, id: string): void {
    this.loadTemplate(source, id);
  }

  // Función para cerrar sesión
  logOut(): void {
    const logoutButton = document.getElementById('Log_Out') as HTMLButtonElement;

    if (!logoutButton) {
      console.error("El botón de cierre de sesión no se encontró.");
      return;
    }

    logoutButton.addEventListener('click', (evt) => {
      evt.preventDefault();

      fetch("http://localhost:3000/users/1", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isLoggedIn: false }),
      })
        .then(() => {
          window.location.replace("index.html");
        })
        .catch((err) => console.error("Error al cerrar sesión:", err));
    });
  }

  // Carga el contenido dependiendo de la pestaña seleccionada
  loadContent(tab: string): void {
    const contentArea = document.getElementById('content-area');

    if (!contentArea) {
      console.error("El área de contenido no se encontró.");
      return;
    }

    contentArea.innerHTML = ""; // Limpia el área de contenido antes de cargar nuevas recetas

    if (tab === "guardado" || tab === "me-gusta" || tab === "ultimas-vistas") {
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
    }
  }
}
