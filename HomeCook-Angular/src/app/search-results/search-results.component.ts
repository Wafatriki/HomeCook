import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { FirestoreService } from '../Services/firestore.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {
  searchQuery: string = '';
  recipes: any[] = [];
  filteredRecipes: any[] = [];

  constructor(private route: ActivatedRoute, private firestoreService: FirestoreService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || '';
      this.loadRecipes();
    });
  }



  loadRecipes(): void {
    this.firestoreService.getRecipes().subscribe(recipes => {
      this.recipes = recipes;
      this.filterRecipes();
    });
  }

  filterRecipes(): void {
    if (!this.searchQuery.trim()) {
      this.filteredRecipes = this.recipes;
    } else {
      this.filteredRecipes = this.recipes.filter(recipe =>
        recipe.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }
}
