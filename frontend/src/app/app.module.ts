import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { DashboardComponent } from '/../pages/dashboard/dashboard.component';
import { FooterComponent } from './shared/footer/footer.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginpatientComponent } from './Pages/LoginPatient/loginpatient.component';
import { LoginpraticienComponent } from './Pages/LoginPraticien/loginpraticien.component';


@NgModule({
  declarations: [
    AppComponent, FooterComponent, ChatbotComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatDialogModule,
    LoginpatientComponent,
    LoginpraticienComponent,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })

  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
