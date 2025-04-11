import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {CommonModule} from '@angular/common';
import { AuthService } from '../../Services/authentication.service'
import {Router} from '@angular/router';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./sign-in.component.css'],
  standalone: true
})
export class SignInComponent {
constructor(private authService: AuthService, private router: Router) {}
  passwordMismatch: boolean = false;
  errorMessage: string | null = null;
  onSubmit(form: NgForm): void {
    const { username, password, nuevaPassword } = form.value;

    // Validar si las contraseñas coinciden
    this.passwordMismatch = password !== nuevaPassword;

    if (form.invalid || this.passwordMismatch) {
      return;
    }

    // Simular envío del formulario
    this.authService.register(username, password).then(() => {
      this.router.navigate(['']);
    }).catch((error) =>{
      this.errorMessage = error;
      return;
    })

    // Simulación de error del servidor
    const simulatedError = false; // Cambiar a `true` para probar

    if (simulatedError) {
      console.error('Error al hacer login');
    }
  }

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

  loadTemplateFromSource(source: string, id: string): void {
    this.loadTemplate(source, id);
  }
}
