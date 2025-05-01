import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  standalone: true, // Indica que es un componente standalone
  imports: [CommonModule, FormsModule] // Importar FormsModule aquí
})
export class SearchComponent {
  searchQuery: string = '';

  constructor(private router: Router) {}

  onSearch(): void {
    console.log('Texto en el campo:', this.searchQuery); // Depuración
    if (this.searchQuery.trim()) {
      console.log('Buscando:', this.searchQuery); // Depuración de la búsqueda
      this.router.navigate(['/recipes-filter'], { queryParams: { search: this.searchQuery } });
    } else {
      console.log('La búsqueda está vacía'); // Depuración si el campo está vacío
    }
  }
}
