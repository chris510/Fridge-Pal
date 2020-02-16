import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs'; 

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
    ).pipe(
      catchError(errorRes => {
        let errorMessage = 'An Unknown error occured!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        } else {
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email exists!';
          }
        }
        return throwError(errorMessage);
      })
    )
  }
}
