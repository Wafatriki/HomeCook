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

}
