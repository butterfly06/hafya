import { Location } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-about',
  imports: [MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MatButtonModule],
  templateUrl: './dialog-about.component.html',
  styleUrl: './dialog-about.component.scss'
})
export class DialogAboutComponent {


  constructor( private location: Location, private dialogRef: MatDialogRef<DialogAboutComponent>, @Inject(MAT_DIALOG_DATA) public data: any){}

onclose(): void {
    this.location.back(); // 👈 goes back to previous route
  }

closeDialog(): void {
    this.dialogRef.close(); // ✅ closes the popup
  }
}
