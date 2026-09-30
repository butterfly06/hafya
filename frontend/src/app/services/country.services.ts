import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class CountryService {

constructor(private http: HttpClient) {}

loadFromAssets() {
  return this.http.get<Country[]>('/assets/countrycode.json');
}
}