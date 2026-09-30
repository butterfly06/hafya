import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

export interface Creneau {
  id: number;
  date: string;      // format 'YYYY-MM-DD'
  heure: string;     // format 'HH:mm'
  disponible: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MockBackendService {

  private creneaux: Creneau[] = [
    { id: 1, date: '2025-11-01', heure: '09:00', disponible: true },
    { id: 2, date: '2025-11-01', heure: '10:00', disponible: false },
    { id: 3, date: '2025-11-02', heure: '14:00', disponible: true },
    { id: 4, date: '2025-11-02', heure: '15:30', disponible: true },
  ];

  constructor() {}

  // Récupérer tous les créneaux
  getCreneaux(): Observable<Creneau[]> {
    return of(this.creneaux).pipe(delay(500)); // simulate server delay
  }

  // Réserver un créneau
  reserverCreneau(id: number): Observable<Creneau | null> {
    return of(this.creneaux).pipe(
      delay(300),
      map((creneaux) => {
        const c = creneaux.find(c => c.id === id);
        if (c && c.disponible) {
          c.disponible = false;
          return c;
        }
        return null;
      })
    );
  }
}
