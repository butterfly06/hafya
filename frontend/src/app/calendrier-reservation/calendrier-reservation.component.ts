import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FilterByDatePipe } from '../filter-by-date.pipe';
import { ApiService } from '../services/api.services';
import { CalendarEvent } from 'angular-calendar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MockBackendService, Creneau } from '../services/mock-backend.service';
import { CalendarService } from '../services/calendar.services';


interface CalendarDay {
  date: number;
  month: number;
  year: number;
  status: 'reservable' | 'reserved' | 'nonCancelable' | 'nonReservable';
}

interface Rendezvous {
  date: string;
  type: 'teleconsultation' | 'consultationCabinet' | 'consultationDomicile' | 'rdvPersonnel';
}

@Component({
  selector: 'app-calendrier-reservation',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterByDatePipe, HttpClientModule],
  templateUrl: './calendrier-reservation.component.html'
})
export class CalendrierReservationComponent implements OnInit {
  praticiens: any[] = [];
  selectedPraticienId: number | null = null;
  currentMonth = 11;
  currentYear = 2025;
  days: CalendarDay[] = [];
  weekDays = ['Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa', 'Di'];
  monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
                'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
  constructor(private calendarService: CalendarService) {}

  ngOnInit() {
    this.calendarService.getPraticiens().subscribe(data => {
      this.praticiens = data;
      if (data.length) {
        this.selectedPraticienId = data[0].id;
        this.loadCalendar();
      }
    });
  }

  loadCalendar() {
    if (!this.selectedPraticienId) return;
    this.calendarService.getCalendar(this.selectedPraticienId, this.currentMonth, this.currentYear)
      .subscribe(data => this.days = data);
  }

  onDayClick(day: any) {
    if (day.status === 'nonReservable') {
      this.calendarService.reserveDay(this.selectedPraticienId!, day)
        .subscribe(() => this.loadCalendar());
    }
  }

  onCancel(day: any) {
    const dateStr = `${this.currentYear}-${this.currentMonth.toString().padStart(2, '0')}-${day.date.toString().padStart(2, '0')}`;
    this.calendarService.cancelDay(this.selectedPraticienId!, dateStr)
      .subscribe(() => this.loadCalendar());
  }
  prevMonth() {
  if (this.currentMonth === 1) {
    this.currentMonth = 12;
    this.currentYear--;
  } else {
    this.currentMonth--;
  }
  this.loadCalendar();
}

nextMonth() {
  if (this.currentMonth === 12) {
    this.currentMonth = 1;
    this.currentYear++;
  } else {
    this.currentMonth++;
  }
  this.loadCalendar();
}

getDayClass(day: CalendarDay): string {
  // logic to decide class based on day.status
  if (day.status === 'reserved') {
    return 'reserved';
  }
  if (day.status === 'nonCancelable') {
    return 'nonCancelable';
  }
  if (day.status === 'nonReservable') {
    return 'nonReservable';
  }
  return '';
}

rendezvous: Rendezvous[] = [
    { date: '2025-05-01', type: 'teleconsultation' },
    { date: '2025-05-01', type: 'consultationCabinet' },
    { date: '2025-05-02', type: 'consultationDomicile' },
    { date: '2025-05-03', type: 'rdvPersonnel' },
    // Ajoutez ici d'autres rendez-vous
  ];

  getTypeColor(type: string): string {
    switch (type) {
      case 'teleconsultation': return 'blue';
      case 'consultationCabinet': return 'red';
      case 'consultationDomicile': return 'green';
      case 'rdvPersonnel': return 'yellow';
      default: return 'gray';
    }
  }

  // Fonction pour obtenir le mois sous format 'MM-YYYY'
  getMonthYear(date: string): string {
    const dateObj = new Date(date);
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const year = dateObj.getFullYear();
    return `${month}-${year}`;
  }

  getRdvForDay(day: number, monthYear: string) {
  return this.rendezvous.filter(rdv => {
    const d = new Date(rdv.date);
    return (
      this.getMonthYear(rdv.date) === monthYear &&
      d.getDate() === day
    );
  });
}


}