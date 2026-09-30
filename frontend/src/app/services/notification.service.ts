// src/app/services/notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, map, Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';



export interface Notification {
  id?: number;         // <-- ADD THIS
  title: string;
  message: string;
  read?: boolean;
  time?: string;
}



@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket;
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$ = this.notificationsSubject.asObservable();
  private _close$ = new Subject<void>();


  private API_URL = 'http://192.168.49.2:30081/api/notifications';

  constructor(private http: HttpClient) {
   
    // Initialize socket once
    this.socket = io('http://192.168.49.2:30081', {
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => console.log('Connected to Socket.IO', this.socket.id));

    // Listen for real-time notifications
    this.socket.on('new-notification', (noti: Notification) => {
      const current = this.notificationsSubject.value;
      this.notificationsSubject.next([noti, ...current]);
    });
  }

  // Fetch notifications from backend
  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.API_URL);
  }

  // Send a new notification
  // createNotification(noti: Notification): Observable<Notification> {
  //   return this.http.post<Notification>(`${this.API_URL}`, noti);
  // }

  createNotification(noti: Notification): Observable<Notification> {
  return this.http.post<Notification>(this.API_URL, noti).pipe(
    map(created => {
      // Update local stream so UI updates instantly
      const current = this.notificationsSubject.value;
      this.notificationsSubject.next([created, ...current]);

      return created;
    })
  );
}


  // Mark notification as read
  markAsRead(id: number): Observable<Notification> {
    return this.http.patch<Notification>(`${this.API_URL}/${id}/read`, {});
  }

  // Observable of unread count
get unreadCount$() {
  return this.notifications$.pipe(
    map(notis => notis.filter(n => !n.read).length)
  );
}

deleteNotification(id: number) {
  return this.http.delete(`${this.API_URL}/${id}`);
}

get close$(): Observable<void> {
    return this._close$.asObservable();
  }

  close(): void {
    this._close$.next();
  }

}


