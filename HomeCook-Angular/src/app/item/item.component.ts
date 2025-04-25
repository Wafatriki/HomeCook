import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() recipe: any; // Recibir datos desde el componente principal
  constructor(private router: Router) { }
  onclick(){
    this.router.navigate(['recipe'], { queryParams: { id: this.recipe.id } });
  }
}
