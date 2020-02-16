import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs'; 
import { User } from './user.model';

export interface AuthResponseData {
  kind?: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  apiKey = 'AIzaSyBuCJjHUUur1xu1d12z2S_LMtLHBZJMZqM';
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private router: Router
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
      catchError(this.handleError),
      tap(resData => {
        this.handleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )  
      })
    )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`, {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap(resData => {
        this.handleAuth(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )  
      })
    )
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth'])
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
      const user = new User(
        email,
        userId,
        token,
        expirationDate
      );
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An Unknown error occured!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    } else {
      switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
          errorMessage = 'This email exists!';
          break;
        case 'EMAIL_NOT_FOUND':
          errorMessage = 'This email does not exist!';
          break;
        case 'INVALID_PASSWORD':
          errorMessage = 'Invalid password!';
          break;
      }
    }
    return throwError(errorMessage);
  }
}
