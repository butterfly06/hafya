import { Component } from '@angular/core';
import { FaceSnapComponent } from './face-snap/face-snap.component';
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
import { PraticienComponent } from './praticien/praticien.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-root',
  imports: [FaceSnapComponent, NavComponent, ReactiveFormsModule, AddUsersComponent, FormsModule, MatDialogActions, MatDialogModule, MatDialogContent, MatDialogTitle, MatButtonModule, FormsModule, MatFormFieldModule, ContactComponent, RouterLink, RouterLinkActive, UpperCasePipe, PraticienComponent, AccueilComponent, ContactComponent, RouterOutlet, MatTooltipModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent{

searchText = '';
}
