import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpraticienpatient',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent
{
username= "";
password= "";
wrongCredentials= false;

constructor(private router: Router) {}
PatientConnexion() {
  this.router.navigate(['/login/patient']);
}
PraticienConnexion() {
  this.router.navigate(['/login/praticien']);
}
CreationComptePatient() {
  this.router.navigate(['/creationcomptepatient']);
}
CreationComptePraticien() {
  this.router.navigate(['/creationcomptepraticien']);
}
}