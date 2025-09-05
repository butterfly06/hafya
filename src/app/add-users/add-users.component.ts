import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { map, Observable } from 'rxjs';


@Component({
  selector: 'app-add-users',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, MatDialogModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatFormFieldModule, MatDatepickerModule],
  templateUrl: './add-users.component.html',
  styleUrl: './add-users.component.css'
})
// export class DatepickerOverviewExample {}
export class AddUsersComponent implements OnInit {
  snapForm!: FormGroup;

  addusersPreview$!: Observable<AddUsersComponent>;
//...

   constructor(private formBuilder: FormBuilder) { }
   
   ngOnInit(): void {
    this.snapForm = this.formBuilder.group({
        firstname: [null, [Validators.required]],
        lastname: [null, [Validators.required]],
        adresse: [null],
        date: [Date]
    });

    this.addusersPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
          ...formValue,
          // createdDate: new Date(),
          // snaps: 0,
          // id: 0
      }))
  );
    
}

onSubmitForm() {
  console.log(this.snapForm.value);
}
onCloseForm() {
  console.log(this.snapForm.value);
}
}
