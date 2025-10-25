import { Component } from '@angular/core';
import { NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddUsersComponent } from './add-users/add-users.component';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import { ContactComponent } from './contact/contact.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { filter } from 'rxjs/operators'; 
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { FooterComponent } from './shared/footer/footer.component';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [ NavComponent, ReactiveFormsModule, AddUsersComponent, FormsModule, MatDialogActions, MatDialogModule, MatDialogContent, MatDialogTitle, MatButtonModule, FormsModule, MatFormFieldModule, ContactComponent, RouterLink, RouterLinkActive, AccueilComponent, ContactComponent, RouterOutlet, MatTooltipModule, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{

 showFooter = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Show footer only if current route is /dashboard or starts with it
      this.showFooter = event.urlAfterRedirects.startsWith('/dashboard');
    });
}}
