import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import {IonCardContent, IonLabel} from "@ionic/angular/standalone";
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  imports: [
    IonicModule
  ],
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() recipe: any; // Recibir datos desde el componente principal
  constructor(private router: Router) { }
  onclick(){
    this.router.navigate(['recipe'], { queryParams: { id: this.recipe.id } });
  }
}
