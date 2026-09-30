import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import {MatRadioModule} from '@angular/material/radio';
import { environment }  from  '../../environments/environment';
import { HttpClientModule } from '@angular/common/http'

@Component({
  selector: 'app-register-praticien',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule, MatRadioModule, HttpClientModule, ReactiveFormsModule],
  templateUrl: './register-praticien.component.html',
  styleUrl: './register-praticien.component.scss'
})
export class RegisterPraticienComponent {

form!: FormGroup;
imageFile: File | null = null;
imagePreview: string | null = null;
// 🔹 Liste de spécialités possibles
  // specialitesList = [
  //   'Cardiologie',
  //   'Dermatologie',
  //   'Pédiatrie',
  //   'Radiologie',
  //   'Chirurgie',
  //   'Neurologie',
  //   'Ophtalmologie'
  // ];
  //{
  specialitesList= [
    "Médecin-andrologue",
    "Médecin-allergologue",
    "Médecin-anesthésiste",
    "Médecin-cardiologue",
    "Médecin-chirurgien cardio-thoracique",
    "Médecin-chirurgien généraliste",
    "Médecin-chirurgien-neurologue",
    "Médecin-chirurgien maxillo-faciale",
    "Médecin-chirurgien-plastique",
    "Médecin-chirurgien vasculaire",
    "Médecin-chirurgien viscérale, digestive",
    "Médecin-dermatologue",
    "Médecin-endocrinologue",
    "Médecin-gastro-entérologue",
    "Médecin-généraliste",
    "Médecin-généticien",
    "Médecin-gériatre/gérontologue",
    "Médecin-gynécologue",
    "Médecin-hématologue",
    "Médecin-hépatologue",
    "Médecin-interniste",
    "Médecin-immunologue",
    "Médecin-infectiologue",
    "Médecin-néphrologue",
    "Médecin-neurologue",
    "Médecin-neurochirurgien",
    "Médecin-nucléaire",
    "Médecin-nutritionniste",
    "Médecin-obstétricien",
    "Médecin-odonto-stomatologue",
    "Médecin-oncologue",
    "Médecin-ophtalmologue",
    "Médecin-oto-rhino-laryngologue",
    "Médecin-orthopédiste",
    "Médecin-pédiatre",
    "Médecin-pharmacologue clinicien",
    "Médecin-physique et réadaptation (PM&R)",
    "Médecin-pneumologue",
    "Médecin en santé publique",
    "Médecin-psychiatre",
    "Médecin-radiologue",
    "Médecin-rhumatologue",
    "Médecin-traumatologue",
    "Médecin du sport",
    "Médecin-du-travail",
    "Médecin-urologue",
    "Médecin-urgentiste",
    "Médecin-vénérologue"
  ];

  searchTerm: string = '';

  errorMessage: string = '';
  selectedCountryCode= ''
  apiUrl = `${environment.apiBaseUrl}`;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Création du formulaire avec un tableau vide pour les spécialités cochées
    this.form = this.fb.group({
      sexe: [''],
      firstname: [''],
      lastname: [''],
      email: ['', [Validators.required]],
      date_naissance: [''],
      countryCode: ['+33', Validators.required],
      telephone: [''],
      adresse_cabinet: ['', [Validators.required]],
      image: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      date_inscription: ['09/10/2025'],
      searchTerm: [''], // 👈 added as a FormControl
      specialites: this.fb.array([])
      //specialites: this.fb.array([]) // tableau dynamique
    
   });
  }


 
  
  onSubmit() {
  
   if (this.form.invalid) {
    this.errorMessage = "Veuillez remplir tous les champs obligatoires.";
    return;
  }

  // 🔹 Déclarer formValues ici
  const formValues = this.form.value;

  // 🔹 Utiliser formValues pour concaténer le téléphone
  const fullPhone = `${formValues.countryCode}${formValues.telephone}`.replace(/\s+/g, '');

  // 🔹 Créer le payload final
  const payload = {
    ...formValues,
    telephone: fullPhone
  };

  delete payload.countryCode; // si nécessaire côté backend

  console.log('Payload envoyé au backend :', payload);    
    this.http.post(`${this.apiUrl}/auth/register/praticien?APIkey=${environment.apikey}`, payload)
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

  // filteredSpecialties(): string[] {
  //   return this.specialitesList.filter(sp =>
  //     sp.toLowerCase().includes(this.searchTerm.toLowerCase())
  //   );
  // }
    

onSpecialiteChange(sp: string, event: Event): void {
  const checkbox = event.target as HTMLInputElement;
  const specialitesFormArray = this.form.get('specialites') as FormArray;

  if (checkbox.checked) {
    // ✅ Add speciality
    specialitesFormArray.push(this.fb.control(sp));
  } else {
    // ❌ Remove speciality
    const index = specialitesFormArray.controls.findIndex(x => x.value === sp);
    if (index !== -1) {
      specialitesFormArray.removeAt(index);
    }
  }

  console.log('Specialites sélectionnées:', this.form.value.specialites);
}



get filteredSpecialites() {
  const term = this.form.get('searchTerm')?.value?.toLowerCase() || '';
  return this.specialitesList.filter(sp => sp.toLowerCase().includes(term));
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