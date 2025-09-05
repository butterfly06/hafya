import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { RouterLink } from '@angular/router';


export interface PatientElement {
  firstname: string;
  lastname: string;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PatientElement[] = [
  {firstname: 'test', lastname: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {firstname: 'toto', lastname: 'Helium', weight: 4.0026, symbol: 'He'},
  {firstname: 'test', lastname: 'Lithium', weight: 6.941, symbol: 'Li'},
  {firstname: 'toto', lastname: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {firstname: 'test', lastname: 'Boron', weight: 10.811, symbol: 'B'},
  {firstname: 'toto', lastname: 'Carbon', weight: 12.0107, symbol: 'C'},
  {firstname: 'test', lastname: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {firstname: 'toto', lastname: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {firstname: 'test', lastname: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {firstname: 'toto', lastname: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {firstname: 'test', lastname: 'Boron', weight: 10.811, symbol: 'B'},
  {firstname: 'toto', lastname: 'Carbon', weight: 12.0107, symbol: 'C'},
  {firstname: 'test', lastname: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {firstname: 'toto', lastname: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {firstname: 'test', lastname: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {firstname: 'toto', lastname: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {firstname: 'test', lastname: 'Boron', weight: 10.811, symbol: 'B'},
  {firstname: 'toto', lastname: 'Carbon', weight: 12.0107, symbol: 'C'},
  {firstname: 'test', lastname: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {firstname: 'toto', lastname: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {firstname: 'test', lastname: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {firstname: 'toto', lastname: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-patient',
  imports: [MatTableModule, RouterLink, MatFormFieldModule, MatInputModule, MatIconModule, MatPaginatorModule],
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})

export class PatientComponent {

  displayedColumns: string[] = ['firstname', 'lastname', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;
}
