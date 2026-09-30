import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ApiService } from '../../services/api.services';

@Component({
  selector: 'app-loginpraticien',
  standalone: true, // ✅ if using imports here
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule, HttpClientModule],
  templateUrl: './loginpraticien.component.html',
  styleUrls: ['./loginpraticien.component.scss'] // ✅ fixed plural
})
export class LoginpraticienComponent {
  email: string = '';
  password: string = '';
  wrongCredentials = false;
  errorMessage: string = '';
  otp: string = '';
  user: string = '';
  showOtpField: boolean = false;
  qrCode: string | null = null;
  needs2FA: boolean = false;
  message: string = '';
  otpVerified: boolean = false;

  

  constructor(private api: ApiService, private router: Router, private http: HttpClient) {}

  login() {
   
    this.api.loginPraticien(this.email, this.password).subscribe({
      next: (res) => {
        if (res.requires2FA) {
          this.needs2FA = true;
          this.qrCode = res.qrCode || null;
          this.message = res.message;
        } else {
          // login classique sans 2FA
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard/praticien']);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Erreur serveur';
      }
    });
  }

 verifyOtp() {
  if (!this.otp || this.otp.length !== 6) {
    this.errorMessage = 'Veuillez entrer un code OTP valide à 6 chiffres';
    return;
  }

  this.errorMessage = ''; // reset error message

  
    this.api.verifyOtpPraticien(this.email, this.otp).subscribe({
    next: (res) => {
      if (res.success) {
        // Stocke le token JWT et redirige l'utilisateur
        localStorage.setItem('token', res.token);
         localStorage.setItem('praticienId', res.Praticien.id.toString());
         localStorage.setItem('sexe', res.Praticien.sexe);
         localStorage.setItem('email', res.Praticien.email);
         localStorage.setItem('nom', res.Praticien.lastname);
         localStorage.setItem('prenom', res.Praticien.firstname);
         localStorage.setItem('image', res.Praticien.image || '');
         localStorage.setItem('date de naissane', res.Praticien.date_naissance);
         localStorage.setItem('date de inscription', res.Praticien.date_inscription);
         localStorage.setItem('adresse', res.Praticien.adresse_cabinet);
        this.router.navigate(['/dashboard/praticien']); // changer selon ton route
      } else {
        this.errorMessage = res.message || 'Code OTP invalide';
      }
    },
    error: (err) => {
      this.errorMessage = err.error.message || 'Erreur serveur';
    }
  });
}

  forgetPwd() {
    this.router.navigate(['/forgotpwd']);
  }

  goBack() {
    this.router.navigate(['/']);
  }
}