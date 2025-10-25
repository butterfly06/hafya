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



@Component({
  selector: 'app-dashboard',
  //standalone: true,
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule, HttpClientModule, MatIconModule, RouterModule, MatChipsModule, MatMenuModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  isClicked = false;
 selectedFile!: File;
  title = '';
  description = '';
  pictures: any[] = [];
  assets = 'assets';

  email: string =''
  user1: { image: string; name: string; email?: string } = { image: '', name: '' };
  error: string = '';
  //  user = {
  //   name: 'Pat',
  //   imageUrl: 'assets/eric.jpeg' // replace with real image URL
  // };


constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
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
  }
  ;
  

 onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  upload() {
    const formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('title', this.title);
    formData.append('description', this.description);

    this.http.post('http://localhost:5001/api/upload', formData).subscribe((res: any) => {
      this.pictures.unshift(res.data);  // prepend to display
    });
  }

  
    ngOnInit() {
    const storedImage = localStorage.getItem('image');
  this.user1 = {
    name: localStorage.getItem('name') ?? '',
    email: localStorage.getItem('email') ?? '',
    image: storedImage && storedImage.trim() !== '' ? storedImage : 'assets/default-avatar.png'
  };

  console.log('Utilisateur connecté :', this.user1);

  }

 fetchUser() {
    if (!this.email) return;

    this.http.get<any>(`${environment.apiBaseUrl}/api/auth/user?email=${this.email}`)
      .subscribe({
        next: (res) => {
        this.user1 = res || { name: '', email: '', image: 'assets/default-avatar.png' };
        this.error = '';
        },
        error: (err: HttpErrorResponse) => {
          this.user1 = { name: '', email: '', image: 'assets/default-avatar.png' };
        this.error = err.error?.message || 'Erreur lors du chargement de l’utilisateur.';
        }
      });
  }
}
