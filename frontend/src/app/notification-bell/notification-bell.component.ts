import { Component, OnInit } from '@angular/core';
import { NotificationService, Notification } from '../services/notification.service';
import { Observable } from 'rxjs';
import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-bell',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgFor, MatChipsModule, MatIconModule, DatePipe, MatCardModule],
  templateUrl: './notification-bell.component.html',
  styleUrls: ['./notification-bell.component.scss'] // ✅ fixed typo
})
export class NotificationBellComponent implements OnInit {
  isOpen = false;
  notifications$!: Observable<Notification[]>; // ✅ keep as Observable
   unreadCount$!: Observable<number>;

  constructor(private notificationService: NotificationService, private router: Router,) {}

  ngOnInit(): void {
    // Use the service Observable directly
    this.notifications$ = this.notificationService.notifications$;
     this.unreadCount$ = this.notificationService.unreadCount$;

    // Load existing notifications from API and update the BehaviorSubject
    this.notificationService.getNotifications().subscribe((notis) => {
      // update the notifications$ BehaviorSubject
      this.notificationService['notificationsSubject'].next(notis);
    });
  }

  markAsRead(noti: Notification) {
    if (!noti.id) return;
    this.notificationService.markAsRead(noti.id).subscribe((updated) => {
      // Update notifications in BehaviorSubject
      const current = this.notificationService['notificationsSubject'].value;
      this.notificationService['notificationsSubject'].next(
        current.map((n) => (n.id === updated.id ? updated : n))
      );
    });
  }

  toggle() {
    this.isOpen = !this.isOpen;
    
  }

  
  goBack() {
  this.notificationService.close();
  this.router.navigate(['/dashboard/patient']);
}


  delete(noti: Notification) {
  if (noti.id === undefined) return; // ✅ skip if no id

  this.notificationService.deleteNotification(noti.id).subscribe({
    next: () => {
      const current = this.notificationService['notificationsSubject'].value;
      this.notificationService['notificationsSubject'].next(
        current.filter(n => n.id !== noti.id)
      );
    },
    error: err => console.error(err)
  });
}



}
