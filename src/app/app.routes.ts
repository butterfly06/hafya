import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AccueilComponent } from './accueil/accueil.component';
import { PatientComponent } from './patient/patient.component';
import { PraticienComponent } from './praticien/praticien.component';
import { LoginComponent } from './Pages/login/login.component';
import { LoginpatientComponent } from './Pages/login/LoginPatient/loginpatient.component';
import { LoginpraticienComponent } from './Pages/login/LoginPraticien/loginpraticien.component';
import { CreationcomptepraticienComponent } from './Pages/login/creationcomptepraticien/creationcomptepraticien.component';
import { CreationcomptepatientComponent } from './Pages/login/creationcomptepatient/creationcomptepatient.component';
import { Creationcomptepatient1Component } from './Pages/login/creationcomptepatient1/creationcomptepatient1.component';
import { ResetpasswordComponent } from './Pages/login/resetpassword/resetpassword.component';
import { ResetpasswordPraticienComponent } from './Pages/login/resetpassword-praticien/resetpassword-praticien.component';

export const routes: Routes = [
    {path: 'praticien', 
    
        component:PraticienComponent},
    {path: 'contact', 
    
            component:ContactComponent},
    {path: 'login', 
    
            component:LoginComponent},
    {path: 'login/patient', 
    
            component:LoginpatientComponent},
    {path: 'login/praticien', 
    
            component:LoginpraticienComponent},
    {path: 'accueil', 
    
                component:AccueilComponent},
    {path: 'patient', 
    
                    component:PatientComponent},
    {path: 'creationcomptepatient', 
    
                    component:CreationcomptepatientComponent},
    {path: 'creationcomptepatient1', 
    
                    component:Creationcomptepatient1Component},
    {path: 'creationcomptepraticien', 
    
                    component:CreationcomptepraticienComponent},
   {path: 'resetpwd', 
    
                    component:ResetpasswordComponent},
   {path: 'resetpwdpraticien', 
    
                    component:ResetpasswordPraticienComponent},

    { 
    path: '**', // bonus: all routes not defined forward to /home
                        redirectTo: 'accueillogin'
    }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
