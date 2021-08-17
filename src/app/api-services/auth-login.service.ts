import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


// const BACKEND_URL = environment.apiURL + '/login';
const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {

  private _loginURL;

  constructor(private http: HttpClient) { }

  loginUser(email: string, password: string) {
    // const loginUserData = user.loginid;
    console.log('BACKEND_URL: ', BACKEND_URL);
    this._loginURL = BACKEND_URL + '/GetuserByName';
    return this.http.post<any>(this._loginURL, { email,password });
  }
}
