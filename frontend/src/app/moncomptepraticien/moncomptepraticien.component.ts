import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.services';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Praticien } from '../interface/praticien';
import { Patient } from '../interface/patient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-moncomptepraticien',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './moncomptepraticien.component.html',
  styleUrl: './moncomptepraticien.component.scss'
})
export class MoncomptepraticienComponent implements OnInit{
  praticien!: Praticien;

date= '';
type: string = '';
 
  errorMessage: string = ''; 
  rendezVous: any[] = [];

  constructor(private route: ActivatedRoute, private api: ApiService,private http: HttpClientModule, private router: Router) {
  
  }
   ngOnInit() {
     const praticienId = localStorage.getItem('Id');
      const email = localStorage.getItem('email')?.trim();
      console.log("this is praticienid", praticienId)
    
if (!email) {
  console.warn('Cannot fetch patient: email is empty');
  return;
}

  if (!praticienId) {
    this.api.getPraticien(email).subscribe({
 next: (res) => {
    console.log('Praticien data:', res);
    this.praticien = {
      email: res.email,
      nom: res.lastname,
      prenom: res.firstname,
      date_naissance: res.datedenaissance,
      telephone: res.telephone
    };
  },
  error: err => console.error('Error fetching praticien:', err)
});
   }
  }
   joursDepuis(date: string | null): number {
  if (!date) return 0;
  const d = new Date(date);
  const maintenant = new Date();
  const diff = maintenant.getTime() - d.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24)); // ✅ return the result
}


  }
