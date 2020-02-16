import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AuthResponseData {
  kind?: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiKey = 'AIzaSyBuCJjHUUur1xu1d12z2S_LMtLHBZJMZqM';
  constructor(
    private http: HttpClient
  ) { }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    );
  }
}
