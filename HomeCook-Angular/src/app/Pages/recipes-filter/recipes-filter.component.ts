import { Component } from '@angular/core';
import {ListOfRecipesComponent} from '../../list-of-recipes/list-of-recipes.component';

@Component({
  selector: 'app-recipes-filter',
  templateUrl: './recipes-filter.component.html',
  imports: [
    ListOfRecipesComponent
  ],
  styleUrls: ['./recipes-filter.component.css']
})
export class RecipesFilterComponent {
  "TiposDeReceta": [
    {
      "Name": "Italiana",
      "Image": "Images/pizza.png",
      "id": "1"
    },
    {
      "Name": "Pasta",
      "Image": "Images/boloñesa.png",
      "id": "2"
    },
    {
      "Name": "Caliente",
      "Image": "Images/soup.png",
      "id": "3"
    },
    {
      "Name": "Dulce",
      "Image": "Images/tiramisu.png",
      "id": "4"
    }
  ];
  constructor() {}

  ngOnInit(): void {}

}
