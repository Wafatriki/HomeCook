import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './home/home.component.html',
  styleUrl: './home/home.component.css'
})
export class AppComponent {
  title = 'HomeCook-Angular';
}
