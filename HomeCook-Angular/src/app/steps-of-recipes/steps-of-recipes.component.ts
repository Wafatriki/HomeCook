import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-steps-of-recipes',
  templateUrl: './steps-of-recipes.component.html',
  styleUrls: ['./steps-of-recipes.component.css'],
})
export class StepsOfRecipesComponent {
  @Input() steps: any[] = [];
}

