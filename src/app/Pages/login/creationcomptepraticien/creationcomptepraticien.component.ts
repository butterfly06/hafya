import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creationcomptepraticien',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule],
  templateUrl: './creationcomptepraticien.component.html',
  styleUrl: './creationcomptepraticien.component.css'
})
export class CreationcomptepraticienComponent {


username= "";
password= "";
wrongCredentials= false;
constructor(private router: Router) {}

suivant()
{
  this.router.navigate(['/login']);}

goBack() {
  this.router.navigate(['/login']);
}
}
