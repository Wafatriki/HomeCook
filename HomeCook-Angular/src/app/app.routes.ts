import { Routes } from '@angular/router';
import {HomePageComponent} from './Pages/home/home.component';
import {HeaderComponent} from './header/header.component';
import { RecipeComponent } from './Pages/recipe/recipe.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'recipe', component: RecipeComponent },
];
