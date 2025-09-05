import {  HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';


@Component({
  selector: 'app-face-snap',
  imports: [
    HttpClientModule
  ],
  templateUrl: './face-snap.component.html',
  styleUrl: './face-snap.component.css'
})
export class FaceSnapComponent {
  title!: string;
  description!: string;
  createAt!: Date;
  image!: string

  ngOnInit(): void {
    this.title= "Datasante";
    this.description= "Bienvenue au site de santé";
    this.createAt= new Date();
    this.image= "https://hellocare.com/img/consultation-en-ligne-big.webp"
  }
}
