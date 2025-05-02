import { Component } from '@angular/core';
import {ListOfRecipesComponent} from '../../list-of-recipes/list-of-recipes.component';
import {SearchResultsComponent} from '../../search-results/search-results.component';
import {ActivatedRoute} from '@angular/router';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-recipes-filter',
  templateUrl: './recipes-filter.component.html',
  imports: [
    ListOfRecipesComponent,
    SearchResultsComponent,
    CommonModule
  ],
  styleUrls: ['./recipes-filter.component.css']
})
export class RecipesFilterComponent {
  searchQuery: string = '';

  constructor(private route: ActivatedRoute) {}

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

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
    });
  }

}
