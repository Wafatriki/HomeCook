import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() recipe: any; // Recibir datos desde el componente principal
}


export class ListOfRecipesComponent {
}
