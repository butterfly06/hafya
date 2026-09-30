import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment }  from  '../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-resetpassword',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.scss'
})
export class ResetpasswordComponent implements OnInit {
  form!: FormGroup;
  token = '';
  message = '';
  error = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // 🔹 Retrieve token from URL
    this.token = this.route.snapshot.paramMap.get('token') || '';

    this.form = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.invalid || this.form.value.password !== this.form.value.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas.';
      return;
    }

    const body = { token: this.token, password: this.form.value.password };

    this.http.post(`${environment.apiBaseUrl}/api/auth/reset-password?APIkey=${environment.apikey}`, body)
      .subscribe({
        next: (res) => {
          this.message = 'Mot de passe réinitialisé avec succès.';
          setTimeout(() => this.router.navigate(['/login']), 2000);
        },
        error: (err) => {
          this.error = err.error?.message || 'Erreur lors de la réinitialisation.';
        }
      });
  }
}

