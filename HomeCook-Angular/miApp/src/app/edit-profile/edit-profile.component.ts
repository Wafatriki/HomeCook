import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import {AuthService} from '../Services/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { FirestoreService } from '../Services/firestore.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, IonicModule,IonicModule,
    ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  profileForm!: FormGroup;
  passwordsMismatch = false;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const name = localStorage.getItem('name') || '';
    const email = localStorage.getItem('email') || '';

    this.profileForm = this.fb.group({
      name: [name, Validators.required],
      email: [email, [Validators.required, Validators.email]],
      currentPassword: [''],
      newPassword: ['']
    });

    this.profileForm.valueChanges.subscribe(() => {
      const current = this.profileForm.get('currentPassword')?.value;
      const newPass = this.profileForm.get('newPassword')?.value;
      this.passwordsMismatch = !!(newPass && current && newPass !== current);
    });
  }

  onSubmit() {
    if (this.profileForm.invalid || this.passwordsMismatch) {
      this.profileForm.markAllAsTouched();
      return;
    }

    const { name, email } = this.profileForm.value;
    localStorage.setItem('name', name);
    localStorage.setItem('email', email);

    alert('✅ Cambios guardados correctamente.');
    this.router.navigate(['/account']); // Sostituisci con la tua route reale
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      console.log('File selezionato:', this.selectedFile.name);
      // Qui potresti volerlo caricare a un backend o visualizzare un'anteprima
    }
  }

  deleteAccount() {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmed) {
      localStorage.clear();
      // eventualmente chiama authService.deleteAccount() se hai un backend
      alert('✅ Cuenta eliminada correctamente.');
      this.router.navigate(['/']);
    }
  }

  logOut(): void {
    this.authService.setAuthToken(null);
    this.authService.logout();
    this.router.navigate(['/login']); // Sostituisci con la tua route di login
  }
}
