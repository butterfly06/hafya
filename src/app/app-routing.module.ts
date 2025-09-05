import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PatientComponent } from './patient/patient.component';
import { PraticienComponent } from './praticien/praticien.component';

export const routes: Routes = [
    {path: 'praticien', 
    
        component:PraticienComponent},
    {path: 'contact', 
    
            component:ContactComponent},
    {path: 'accueil', 
    
                component:AccueilComponent},
    {path: 'patient', 
    
                    component:PatientComponent},
    { 
    path: '**', // bonus: all routes not defined forward to /home
                        redirectTo: 'accueil'
    }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
