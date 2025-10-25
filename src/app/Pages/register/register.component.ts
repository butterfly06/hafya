import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment }  from  '../../../environments/environment';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  user = {
    name: '',
    email: '',
    image: '',
    password: ''
  };

  errorMessage: string = '';
  apiUrl = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    this.http.post(`${this.apiUrl}/api/auth/register?APIkey=${environment.apikey}`, this.user)
      .subscribe({
        next: (res) => {
          console.log('Registration successful', res);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.errorMessage = err.error?.message || 'Erreur inconnue';
        }
      });
  }

  // ⬇️ FIXED: Properly declared and placed outside onSubmit
  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.user.image = reader.result as string; // base64 string
      };
      reader.readAsDataURL(file);
    }
  }
}
