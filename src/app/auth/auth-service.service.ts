import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/http';

interface AuthResponseData{
  kind: string;
  idToken: string;
  email:string;
  refreshToken: string;
  expiresIn: number;
  localId: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthServiceService {

  constructor(private http:HttpClient) { }

  signUp(email:string,password:string) {
   return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
    AIzaSyDdO5PzeDpydnnfKpEbIxTw5xBmcrRU8Ow`,
    {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
}
  