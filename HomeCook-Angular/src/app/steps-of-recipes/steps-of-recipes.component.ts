import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-steps-of-recipes',
  standalone: true, // Indica que el componente puede funcionar por sí solo
  imports: [CommonModule], // Importa CommonModule para permitir *ngFor y *ngIf
  templateUrl: './steps-of-recipes.component.html',
  styleUrls: ['./steps-of-recipes.component.css'],
})
export class StepsOfRecipesComponent implements OnChanges {
  @Input() steps: any[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['steps']) {
      console.log('Pasos actualizados en el componente hijo:', this.steps);
    }
  }
}
