import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resetpassword-praticien',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule,MatFormFieldModule,MatButtonToggleModule,MatCheckboxModule,MatRadioModule],
  templateUrl: './resetpassword-praticien.component.html',
  styleUrl: './resetpassword-praticien.component.css'
})
export class ResetpasswordPraticienComponent {
  username= "";
password= "";
wrongCredentials= false;

constructor(private router: Router) {
  
}
suivant()
{
  this.router.navigate(['/login']);}

goBack() {
  this.router.navigate(['/login']);
}
valider(){

}
}
