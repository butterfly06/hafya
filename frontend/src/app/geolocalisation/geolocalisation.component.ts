import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-geolocalisation',
  imports: [CommonModule],
  templateUrl: './geolocalisation.component.html',
  styleUrl: './geolocalisation.component.scss'
})
export class GeolocalisationComponent implements OnInit, OnDestroy {

  latitude: number | null = null;
  longitude: number | null = null;
  watchId: number | null = null;
  errorMessage: string = '';

  
ngAfterViewInit() {
  const map = L.map('map').setView([this.latitude || 0, this.longitude || 0], 13);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map);
}
  ngOnInit(): void {
    if ('geolocation' in navigator) {
      // Watch la position en temps réel
      this.watchId = navigator.geolocation.watchPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log('Position mise à jour:', this.latitude, this.longitude);
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
          this.errorMessage = 'Impossible de récupérer la position.';
        },
        {
          enableHighAccuracy: true, // utilise GPS si dispo
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      this.errorMessage = 'La géolocalisation n’est pas supportée par ce navigateur.';
    }
  }

  ngOnDestroy(): void {
    // Arrêter la surveillance si le composant est détruit
    if (this.watchId !== null) {
      navigator.geolocation.clearWatch(this.watchId);
    }
  }
}

