import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { Component, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { environment }  from  '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogAboutComponent } from '../../dialog-about/dialog-about.component';
import { NotificationBellComponent } from '../../notification-bell/notification-bell.component';
import { Notification, NotificationService } from '../../services/notification.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    MatChipsModule,
    MatMenuModule,
    HttpClientModule,
    NotificationBellComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  isClicked = false;
 selectedFile!: File;
  title = '';
  description = '';
  pictures: any[] = [];
  assets = 'assets';
  //data: any;
  type: string = '';
  email: string =''
  patient: { image: string; prenom: string; sexe: string; email?: string } = { image: '', prenom: '', sexe: '' };
  praticien: { image: string; prenom: string; sexe: string; email?: string } = { image: '', prenom: '', sexe: '' };

  error: string = '';
  


constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute, private dialog: MatDialog, private notif: NotificationService) {
  console.log('HttpClient fonctionne ✅');
}


logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }

  accueil() {
    this.router.navigate(['/accueil']);
  }
        
 toggleChatbot()
 {
   this.router.navigate(['/chatbot']);

 };
 
  toggleClick() {
    this.isClicked = !this.isClicked;
  };

openPopup(): void {
  const dialogRef = this.dialog.open(DialogAboutComponent, {
    width: '350px',
    disableClose: true // optional
  });  
  
}
 onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.http.post('http://192.168.49.2:30081/api/upload', formData).subscribe((res: any) => {
      this.pictures.unshift(res.data);  // prepend to display
    });
  }

  

   ngOnInit(): void {
    this.type = this.route.snapshot.paramMap.get('type') || '';
    if (this.type === 'patient') {
     const storedImage = localStorage.getItem('image');
   this.patient = {
     prenom: localStorage.getItem('prenom') ?? '',
     sexe: localStorage.getItem('sexe') ?? '',
     email: localStorage.getItem('email') ?? '',
     image: storedImage && storedImage.trim() !== '' ? storedImage : 'assets/default-avatar.png'
    } }
    else if (this.type === 'praticien') {
         const storedImage = localStorage.getItem('image');
   this.praticien = {
     prenom: localStorage.getItem('prenom') ?? '',
     sexe: localStorage.getItem('sexe') ?? '',
     email: localStorage.getItem('email') ?? '',
     image: storedImage && storedImage.trim() !== '' ? storedImage : 'assets/default-avatar.png'
    }
    
  }
   }


 fetchUser() {
    if (!this.email) return;

    this.http.get<any>(`${environment.apiBaseUrl}/auth/user?email=${this.email}`)
      .subscribe({
        next: (res) => {
        this.patient = res || {sexe: '', prenom: '', email: '', image: 'assets/default-avatar.png' };
        this.error = '';
        },
        error: (err: HttpErrorResponse) => {
          //this.patient = { sexe: '' , prenom: '', email: '', image: 'assets/default-avatar.png' };
        this.error = err.error?.message || 'Erreur lors du chargement de l’utilisateur.';
        }
      });

      
  }
  Resetpwd() {
  this.router.navigate(['/resetpwd']);
}

 Moncompte() {
  this.router.navigate(['/moncompte']);
}
 MoncomptePraticien() {
  this.router.navigate(['/moncomptepraticien']);
}
openCalendrier(){
this.router.navigate(['/calendrier']);

}

openNotification(){
this.router.navigate(['/notifications']);

}

createNewNotification(): void {
  const newNoti: Notification = {
    //id: Date.now(),
    title: 'Connexion réussie',
    message: `Bienvenue ${localStorage.getItem('prenom')}!`,
    time: new Date().toISOString(),
    read: false
  };
  console.log("this is where i'm")
  console.log("Creating notification:", newNoti);
  this.notif.createNotification(newNoti); // ✅ type matches interface
}


}