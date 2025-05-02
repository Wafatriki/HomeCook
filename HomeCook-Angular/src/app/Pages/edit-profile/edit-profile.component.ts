import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../Services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  private name: string | null = localStorage.getItem('name');
  private url: string | null = localStorage.getItem('url');
  private id: string | null = localStorage.getItem('id');

  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit() {
    if (this.name && this.url && this.id) {
      this.loadTemplate(this.url, this.id, () => {
        console.log('Template loaded successfully');
      });
    } else {
      console.error('Missing required data from localStorage');
    }

    this.setValidity();
  }

  logOut(): void {
    this.authService.setAuthToken(null);
    this.authService.logout();
    this.router.navigate(['']); // ✅ Redirigir a la página de inicio tras cerrar sesión
  }

  loadTemplate(fileName: string, id: string, callback?: () => void) {
    fetch(fileName).then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to fetch template: ${res.statusText}`);
      }
      return res.text();
    }).then((text) => {
      const element = document.getElementById(id);
      if (element) {
        element.innerHTML = text;
      }

      if (callback) {
        callback();
      }
    }).catch((error) => {
      console.error('Error loading template:', error);
    });
  }

  setValidity() {
    const pass = document.getElementById('new-password') as HTMLInputElement;
    const oldPass = document.getElementById('current-password') as HTMLInputElement;
    const save = document.getElementById('save-changes-button') as HTMLButtonElement;
    const name = document.getElementById('name') as HTMLInputElement;
    const email = document.getElementById('email') as HTMLInputElement;

    if (!pass || !oldPass || !save || !name || !email) {
      console.error('One or more elements are missing in the DOM.');
      return;
    }

    // Validación de contraseñas
    pass.addEventListener('input', function () {
      if (pass.value === oldPass.value) {
        pass.setCustomValidity(''); // Las contraseñas coinciden
      } else {
        pass.setCustomValidity('Las contraseñas no coinciden');
      }
      pass.reportValidity(); // Refleja el estado de validación en la interfaz
    });

    save.addEventListener('click', function (evt) {
      // Validar Nombre
      if (!name.value.trim()) {
        name.setCustomValidity('Por favor, ingresa tu nombre.');
      } else {
        name.setCustomValidity('');
      }

      // Validar Email
      if (!email.value.trim()) {
        email.setCustomValidity('Por favor, ingresa tu email.');
      } else if (!validateEmail(email.value.trim())) {
        email.setCustomValidity('Por favor, ingresa un email válido.');
      } else {
        email.setCustomValidity('');
      }

      // Validar Contraseñas
      if (!oldPass.value.trim() || !pass.value.trim()) {
        pass.setCustomValidity('Por favor, completa ambos campos de contraseña.');
      } else if (pass.value === oldPass.value) {
        pass.setCustomValidity(''); // Las contraseñas coinciden
      } else {
        pass.setCustomValidity('Las contraseñas no coinciden.');
      }

      // Verificar la validez de los campos antes de enviar
      if (!name.checkValidity() || !email.checkValidity() || !pass.checkValidity()) {
        evt.preventDefault(); // Prevenir el envío si hay errores
        name.reportValidity();
        email.reportValidity();
        pass.reportValidity();
      } else {
        // Si todo es válido, redirige a otra página
        window.location.href = '../Account.html';
      }
    });
  }
}

// Función para validar email
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular simple para validar email
  return emailRegex.test(email);
}

