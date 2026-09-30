import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  loginPatient(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/auth/login/patient?APIkey=${environment.apikey}`,
      { email, password }
    );
  }

  loginPraticien(email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/auth/login/praticien?APIkey=${environment.apikey}`,
      { email, password }
    );
  }

  getPatient(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);

    return this.http.get(
      `${this.baseUrl}/auth/patient?APIkey=${environment.apikey}`,
      { params }
    );
  }

  getPraticien(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);

    return this.http.get(
      `${this.baseUrl}/auth/praticien?APIkey=${environment.apikey}`,
      { params }
    );
  }

  getRendezVous(patientId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/rendezvous/patient/${patientId}?APIkey=${environment.apikey}`
    );
  }

  // Générer un secret + QR code pour 2FA
  generateOtp(email: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/auth/mfa/generate?APIkey=${environment.apikey}`,
      { email }
    );
  }

  // Vérifier le code OTP du praticien
  verifyOtpPraticien(email: string, token: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/auth/mfa/verify/praticien?APIkey=${environment.apikey}`,
      { email, token }
    );
  }

  // Vérifier le code OTP du patient
  verifyOtpPatient(email: string, token: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/auth/verify-otp/patient?APIkey=${environment.apikey}`,
      { email, token }
    );
  }
}
