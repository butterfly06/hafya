import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
LOGIN_URL= '';
LOGOUT_URL= '';
export class ServiceLoginService {

  constructor() { 
    private  httpClient: HttpClient
  }
  {}
  login(pUsername, pPassword)
  {
    const loginData = {
      username: pUsername,
      password: pPassword
    };
    return new Observable<boolean>((observer)) => {
    this.httpClient.post(this.LOGIN_URL, loginData).subscribe(result =>{observer.next(true); observer.complete();})
    };
  }
}
