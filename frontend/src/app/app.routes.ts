import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'
import { RouterModule, Routes } from '@angular/router';
import { AddUsersComponent } from './add-users/add-users.component';
import { AppComponent } from './app.component';
import { ContactComponent } from './contact/contact.component';
import { AccueilComponent } from './accueil/accueil.component';
import { LoginComponent } from './Pages/login/login.component';
import { LoginpatientComponent } from './Pages/LoginPatient/loginpatient.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { RegisterPraticienComponent } from './register-praticien/register-praticien.component';
import { LoginpraticienComponent } from './Pages/LoginPraticien/loginpraticien.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { MoncompteComponent } from './moncompte/moncompte.component';
import { GeolocalisationComponent } from './geolocalisation/geolocalisation.component';
import { CalendrierReservationComponent } from './calendrier-reservation/calendrier-reservation.component';
import { MoncomptepraticienComponent } from './moncomptepraticien/moncomptepraticien.component';
import { NotificationBellComponent } from './notification-bell/notification-bell.component';

export const routes: Routes = [
    {path: 'contact', 
    
            component:ContactComponent},
    {path: 'login', 
    
            component:LoginComponent},
            {path: 'accueil', 
    
                component:AccueilComponent},
     {path: 'chatbot', 
    
                component:ChatbotComponent},
    
     { path: 'dashboard/:type', component: DashboardComponent },
     { path: 'loginpatient', component: LoginpatientComponent},
     { path: 'loginpraticien', component: LoginpraticienComponent},
     { path: 'register', component: RegisterComponent},
     { path: 'registerpraticien', component: RegisterPraticienComponent},
     { path: 'forgotpwd', component: ForgotpasswordComponent},
     { path: 'resetpwd', component: ResetpasswordComponent},
     { path: 'moncompte', component: MoncompteComponent},
     { path: 'moncomptepraticien', component: MoncomptepraticienComponent},
     { path: 'geo', component: GeolocalisationComponent},
     { path: 'calendrier', component: CalendrierReservationComponent},
     { path: 'notifications', component: NotificationBellComponent},


    {
    path: '**', // bonus: all routes not defined forward to /home
                        redirectTo: 'login'
    }

];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class AppRoutingModule { }
