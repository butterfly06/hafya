import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginpraticien',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule],
  templateUrl: './loginpraticien.component.html',
  styleUrl: './loginpraticien.component.css'
})
export class LoginpraticienComponent
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
  this.router.navigate(['/resetpwdpraticien']);
}
}

