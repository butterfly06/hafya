import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment }  from  '../../../environments/environment'
@Component({
  selector: 'app-loginpatient',
  standalone: true,
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule, HttpClientModule],
  templateUrl: './loginpatient.component.html',
  styleUrl: './loginpatient.component.css'
})

export class LoginpatientComponent
{
username= "";
password= "";
wrongCredentials= false;

//email: string = '';
  loginData = {
    email: '',
    password: ''
  };
  errorMessage: string = ''; 

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {

    
  }
login()
{  this.wrongCredentials= !this.wrongCredentials;}

goBack() {
  this.router.navigate(['/login']);
}
forgetPwd() {
  this.router.navigate(['/resetpwd']);
}
onSubmit() {
  //console.log('Submitting login data:', this.loginData);

  this.http.post(`${environment.apiBaseUrl}/api/auth/login?APIkey=${environment.apikey}`, this.loginData)
    .subscribe({
      next: (res: any) => {
        console.log('Login success:', res);
        localStorage.setItem('token', res.token);
      localStorage.setItem('email', res.email);
      localStorage.setItem('email', res.user.email);
      localStorage.setItem('name', res.user.name);
      localStorage.setItem('image', res.user.image || '');

        const email = localStorage.getItem('email');
      
        console.log("Utilisateur connecté :", email);
        
        this.router.navigate(['/dashboard'], { replaceUrl: true });
      },
      error: (err) => {
        console.log("Full error:", err);
        this.errorMessage = err.error?.message || 'Erreur inconnue';
      }
    });
}
}