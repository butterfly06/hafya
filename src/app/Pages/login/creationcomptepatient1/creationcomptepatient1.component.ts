import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creationcomptepatient1',
  imports: [MatCardModule, FormsModule, MatInputModule, CommonModule,MatFormFieldModule,MatButtonToggleModule,MatCheckboxModule,MatRadioModule],
  templateUrl: './creationcomptepatient1.component.html',
  styleUrl: './creationcomptepatient1.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Creationcomptepatient1Component {
nom1= "";
nom2= "";
prenom1= "";
prenom2= "";
datedenaissance= "";
adresse= "";
location= "";
selectedGender: string = '';
wrongCredentials= false;
selectedFile: File | null = null;
uploadResponse: string = '';
constructor(private router: Router) {
  
}

onFileSelected(event: Event): void {
  const fileInput = event.target as HTMLInputElement;

  if (!fileInput.files || fileInput.files.length === 0) {
    console.log('No file selected.');
    return;
  }

  const file = fileInput.files[0];

  // Allowed types
  const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg'];
  const maxSizeInMB = 5;
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

   // Check type
  if (!allowedTypes.includes(file.type)) {
    //alert(`Invalid file type. Allowed types: ${allowedTypes.join(', ')}`);
    return;
  }

  // Check size
  if (file.size > maxSizeInBytes) {
    alert(`File is too large. Max size is ${maxSizeInMB} MB.`);
    return;
  }
  // ✅ Valid file

    const reader = new FileReader();
  reader.onload = () => {
    const imageUrl = reader.result as string;
    console.log('Image URL:', imageUrl); // pour afficher dans <img [src]>
  };
  reader.readAsDataURL(file);
}
  

  onUpload(): void {
    if (!this.selectedFile) {
      this.uploadResponse = 'No file selected.';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
  // this.http.post('http://localhost:3000/upload', formData).subscribe({
  //     next: (res) => this.uploadResponse = 'Upload successful!',
  //     error: (err) => this.uploadResponse = 'Upload failed.',
  //   });
  }


hideSingleSelectionIndicator = signal(false);

suivant()
{
  this.router.navigate(['/login']);}

goBack() {
  this.router.navigate(['/creationcomptepatient']);
}
creercompte(){

}
 toggleSingleSelectionIndicator() {
    this.hideSingleSelectionIndicator.update(value => !value);
  }
}
