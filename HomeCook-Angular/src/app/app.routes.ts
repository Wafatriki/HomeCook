import { Routes } from '@angular/router';
import {HomePageComponent} from './Pages/home/home.component';
import {HeaderComponent} from './header/header.component';
import { RecipeComponent } from './Pages/recipe/recipe.component';
import {EditProfileComponent} from './Pages/edit-profile/edit-profile.component';
import {LoginComponent} from './Pages/login/login.component';
import {RecipesFilterComponent} from './Pages/recipes-filter/recipes-filter.component';
import {SearchRecipesComponent} from './Pages/search-recipes/search-recipes.component';
import {SignInComponent} from './Pages/sign-in/sign-in.component';
import {AccountComponent} from './Pages/account/account.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  {path: 'account', component: AccountComponent},
  { path: 'recipe', component: RecipeComponent },
  { path: 'edit', component: EditProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recipes-filter', component: RecipesFilterComponent },
  { path: 'searchRecipes', component: SearchRecipesComponent },
  { path: 'SignIn', component: SignInComponent }
];
