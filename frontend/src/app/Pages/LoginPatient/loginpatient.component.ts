import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ApiService } from '../../services/api.services';
import { Notification, NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-loginpatient',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule
  ],
  templateUrl: './loginpatient.component.html',
  styleUrls: ['./loginpatient.component.scss']
})
export class LoginpatientComponent{
  email = '';
  password = '';
  otp = '';
  qrCode: string | null = null;
  message = '';
  needs2FA = false;
  errorMessage = '';


  
  constructor(private http: HttpClient, private router: Router, private api: ApiService) {}

  login() {
   
    this.api.loginPatient(this.email, this.password).subscribe({
      next: (res) => {
        if (res.requires2FA) {
          this.needs2FA = true;
          this.qrCode = res.qrCode || null;
          this.message = res.message;
        } else {
          // login classique sans 2FA
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard/patient']);
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

  
    this.api.verifyOtpPatient(this.email, this.otp).subscribe({
    next: (res) => {
      if (res.success) {
        // Stocke le token JWT et redirige l'utilisateur
        
        localStorage.setItem('token', res.token);
         localStorage.setItem('patientId', res.Patient.id.toString());
          localStorage.setItem('sexe', res.Patient.sexe);
          localStorage.setItem('email', res.Patient.email);
          localStorage.setItem('nom', res.Patient.lastname);
          localStorage.setItem('prenom', res.Patient.firstname);
          localStorage.setItem('image', res.Patient.image || '');
          localStorage.setItem('date de naissane', res.Patient.date_naissance);
          localStorage.setItem('date de inscription', res.Patient.date_inscription);
          localStorage.setItem('adresse', res.Patient.adresse);
        this.router.navigate(['/dashboard/patient']);
       
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