import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment }  from  '../../environments/environment'

@Injectable({
  providedIn: 'root'  // <-- important, pour que Angular l’injecte partout
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<any> {
    return this.http.get(`${environment.apiBaseUrl}/api/auth/user/${id}?APIkey=${environment.apikey}`);
  }
}
