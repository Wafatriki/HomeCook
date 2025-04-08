import { Component } from '@angular/core';
import {ListOfRecipesComponent} from '../../list-of-recipes/list-of-recipes.component';

@Component({
  selector: 'app-search-recipes',
  templateUrl: './search-recipes.component.html',
  imports: [
    ListOfRecipesComponent
  ],
  styleUrls: ['./search-recipes.component.css']
})
export class SearchRecipesComponent {

  // Método para cargar un template desde un archivo
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
      .catch((error) => console.error('Error al cargar el template:', error));
  }

  // Método que utiliza loadTemplate para cargar un recurso desde una fuente
  loadTemplateFromSource(source: string, id: string): void {
    this.loadTemplate(source, id);
  }
}
