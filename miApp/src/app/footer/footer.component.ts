import { Component, OnInit } from '@angular/core';
import {IonCol, IonFooter, IonGrid, IonRow, IonText, IonTitle, IonToolbar} from "@ionic/angular/standalone";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    IonFooter,
    IonToolbar,
    IonTitle,
    IonGrid,
    IonRow,
    IonCol,
    IonText
  ]
})
export class FooterComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
