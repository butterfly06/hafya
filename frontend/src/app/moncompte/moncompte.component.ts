import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.services';
import { Patient } from '../interface/patient';

@Component({
  selector: 'app-moncompte',
  standalone: true,
  imports: [MatMenuModule, MatChipsModule, MatIconModule, HttpClientModule, CommonModule],
  templateUrl: './moncompte.component.html',
  styleUrls: ['./moncompte.component.scss']
})
export class MoncompteComponent implements OnInit {
  patient?: Patient; // optional until loaded
  type: string = '';
  date: string = '';
  rendezVous: any[] = [];
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    const email = localStorage.getItem('email')?.trim();
    const patientId = localStorage.getItem('Id');
    console.log("patient information", patientId)

    if (!email) {
      console.warn('Cannot fetch patient: email is empty');
      return;
    }

    // Determine user type
    this.type = patientId ? 'praticien' : 'patient';

    if (this.type === 'patient') {
      this.api.getPatient(email).subscribe({
        next: (res) => {
          console.log('Patient data:', res);
          this.patient = {
            //email: res.email,
            nom: res.lastname,
            prenom: res.firstname,
            date_naissance: res.datedenaissance,
            telephone: res.telephone
          };
        },
        error: (err) => {
          console.error('Error fetching patient:', err);
          this.errorMessage = 'Erreur lors du chargement du patient.';
        }
      });
    } else {
      // If you later implement praticien fetching
      console.warn('Praticien fetching not implemented yet');
    }
  }

  joursDepuis(date: string | null): number {
    if (!date) return 0;
    const d = new Date(date);
    const maintenant = new Date();
    const diff = maintenant.getTime() - d.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }
}
