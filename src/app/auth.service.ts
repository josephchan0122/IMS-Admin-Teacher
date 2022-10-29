import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from "../environments/environment";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  api_url = environment.API_URL;
  constructor(private httpClient:HttpClient, public router:Router) { }
  login(username,pwd) {
    var reqHeader = new HttpHeaders({ 'No-Auth':'True' });
    return this.httpClient.post<any>(`${this.api_url}/user/login/`,{
      username:username,
      password:pwd
    }, {headers:reqHeader})
  }

  getAccessToken(){
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  logout() {
    if (localStorage.removeItem('access_token') == null) {
      this.router.navigate(['/auth/login']);
    }
  }

}
