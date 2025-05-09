import { Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";
import {HeaderComponent} from "./header/header.component";

export const routes: Routes = [
  {
    path: '',
    component: HomepageComponent,
  },
  {
    path: 'editProfile',
    component: EditProfileComponent,
  }
];
