import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, of, pipe, map, tap, catchError, throwError } from 'rxjs';

import { AuthStatusEnum, AuthUrlEnum, LocalStorageItemEnum } from '../enum';
import { environment } from 'src/environments/environments';
import { CheckAuthResponseInterface, LoginResponseInterface, UserInterface } from '../interfaces/';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl : string = environment.baseUrl;
  private http = inject( HttpClient );

  private _currentUser = signal<UserInterface | null>(null);
  private _authStatus  = signal<AuthStatusEnum>(AuthStatusEnum.checking);

  public currenUser = computed(() => this._currentUser() );
  public authStatus = computed(() => this._authStatus() );

  constructor() {
    this.checkAuthStatus().subscribe();
  }

  private setAuthentication(user : UserInterface, token : string) : boolean {
    this._currentUser.set(user);
    this._authStatus.set(AuthStatusEnum.authenticated);
    localStorage.setItem(LocalStorageItemEnum.token, token);
    return true;
  }

  public login(email : string, password : string) : Observable<boolean> {
    const url : string = `${this.baseUrl}${AuthUrlEnum.login}`;
    const body = { email, password };

    return this.http.post<LoginResponseInterface>(url, body)
    .pipe(
      map(({ user, token }) => this.setAuthentication(user, token)),
      catchError( (errorMessage) => throwError(() => errorMessage.error.message) ),
    );
  }

  public checkAuthStatus() : Observable<boolean> {
    const url     = `${this.baseUrl}${AuthUrlEnum.checkToken}`;
    const token   = localStorage.getItem(LocalStorageItemEnum.token);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    if(!token) {
      throwError(() => 'Token not found. Please login with a valid account.');
      this.logout()
      return of(false);
    }

    return this.http.get<CheckAuthResponseInterface>(url, { headers })
      .pipe(
        map(({ user, token }) => this.setAuthentication(user, token)),
        catchError(() => {
          this._authStatus.set(AuthStatusEnum.notAuthenticated);
          throwError(() => 'You are not authenticated' );
          return of(false);
        })
      )
  }

  public logout() {
    /*
    *DELETE TOKEN FROM LOCALSTORAGE
    *DELETE LAST URL VISITED FROM LOCALSTORAGE
    *SET CURRENT USER INFO AS NULL OR UNDEFINED
    *SET AUTH STATUS AS NOT AUTHENTICATED
    *REDIRECT TO LOGIN PAGE
    */
    localStorage.removeItem(LocalStorageItemEnum.token);
    localStorage.removeItem(LocalStorageItemEnum.url);
    this._currentUser.set(null);
    this._authStatus.set(AuthStatusEnum.notAuthenticated);
  }
}
