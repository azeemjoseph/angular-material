import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiURL;

@Injectable({
  providedIn: 'root'
})
export class SignupService {


  private _signUpURL;

  constructor(private http: HttpClient,private route: Router) { }

  signUpUser(email: string, password: string) {
   this._signUpURL = BACKEND_URL + '/createUser';
   return this.http.post<any>(this._signUpURL , { email , password});

  }

}
