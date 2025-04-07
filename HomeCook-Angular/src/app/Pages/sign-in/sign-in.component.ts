import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

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
