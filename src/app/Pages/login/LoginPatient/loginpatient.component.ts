import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
@Component({
  selector: 'app-loginpatient',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule],
  templateUrl: './loginpatient.component.html',
  styleUrl: './loginpatient.component.css'
})
export class LoginpatientComponent
{
username= "";
password= "";
wrongCredentials= false;

constructor(private router: Router) {}
login()
{
  this.wrongCredentials= !this.wrongCredentials;}

goBack() {
  this.router.navigate(['/login']);
}
forgetPwd() {
  this.router.navigate(['/resetpwd']);
}
}
