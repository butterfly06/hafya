import { Pipe, PipeTransform } from '@angular/core';
import { Creneau } from './services/mock-backend.service';

@Pipe({
  name: 'filterByDate',
  standalone: true  // important si tu veux l’utiliser dans un standalone component
})
export class FilterByDatePipe implements PipeTransform {
  transform(creneaux: Creneau[], dateSelectionnee: string): Creneau[] {
    if (!creneaux || !dateSelectionnee) return creneaux;
    return creneaux.filter(c => c.date === dateSelectionnee);
  }
}
