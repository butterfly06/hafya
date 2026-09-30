import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment }  from  '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgotpassword',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {

  form!: FormGroup;
  message = '';
  error = '';

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const email = this.form.value.email;
    this.http.post(`${environment.apiBaseUrl}/auth/forgot-password?APIkey=${environment.apikey}`, { email })
      .subscribe({
        next: (res: any) => {
          this.message = 'Un email de réinitialisation a été envoyé.';
          this.error = '';
        },
        error: (err) => {
          this.error = err.error?.message || 'Erreur lors de l’envoi du lien.';
        }
      });
  }
}