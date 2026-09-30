import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class CalendarService {
   private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getPraticiens(): Observable<any> {
    return this.http.get(`${this.baseUrl}/praticiens`);
  }

  getCalendar(praticienId: number, month: number, year: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/calendar/${praticienId}?month=${month}&year=${year}`);
  }

  reserveDay(praticienId: number, day: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/calendar/${praticienId}/reserve`, day);
  }

  cancelDay(praticienId: number, date: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/calendar/${praticienId}/${date}`);
  }
}
