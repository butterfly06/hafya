import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creationcomptepatient',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule],
  templateUrl: './creationcomptepatient.component.html',
  styleUrl: './creationcomptepatient.component.css'
})
export class CreationcomptepatientComponent {

username= "";
password= "";
wrongCredentials= false;
constructor(private router: Router) {}

suivant()
{
  this.router.navigate(['/creationcomptepatient1']);}

goBack() {
  this.router.navigate(['/login']);
}
}
