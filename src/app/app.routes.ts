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

export const routes: Routes = [
    {path: 'contact', 
    
            component:ContactComponent},
    {path: 'login', 
    
            component:LoginComponent},
            {path: 'accueil', 
    
                component:AccueilComponent},
     {path: 'chatbot', 
    
                component:ChatbotComponent},
    
     { path: 'dashboard', component: DashboardComponent },
     { path: 'loginpatient', component: LoginpatientComponent},
     { path: 'register', component: RegisterComponent },

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
