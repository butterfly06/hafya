import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { environment }  from  '../../../environments/environment';
import { HttpClientModule } from '@angular/common/http'

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule, MatRadioModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  
form!: FormGroup;
imageFile: File | null = null;
imagePreview: string | null = null;
  errorMessage: string = '';
  apiUrl = `${environment.apiBaseUrl}`;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  
  
  ngOnInit(): void {
    // Création du formulaire avec un tableau vide pour les spécialités cochées
   
   
    this.form = this.fb.group({
      sexe: [''],
      firstname: [''],
      lastname: [''],
      email: [''],
      date_naissance: [''],
      telephone: [''],
      adresse_cabinet: [''],
      image: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      date_inscription: ['09/10/2025'],
      specialites: this.fb.array([]) // tableau dynamique
    
   });
  }
  onSubmit() {
    console.log("this patient information", this.form.value)
    this.http.post(`${this.apiUrl}/auth/register/patient?APIkey=${environment.apikey}`, this.form.value)
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

  
// 🔹 Quand l'utilisateur choisit une image
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.imageFile = file;

      // Lire l'image pour affichage dans un <img>
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.form.patchValue({ image: this.imagePreview }); // 🔹 ajoute la base64 dans le formControl
      };
      reader.readAsDataURL(file);
    }
  }

}
