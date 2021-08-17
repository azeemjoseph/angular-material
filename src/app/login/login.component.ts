import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { AuthLoginService } from '../api-services/auth-login.service';

@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public loginInvalid = true;
  private formSubmitAttempt = false;
  private returnUrl: string;
  loginForm: FormGroup;

  constructor(private _authLogin: AuthLoginService, private snackBar: MatSnackBar, private router: Router) { }


  ngOnInit() {
    this.loginForm = new FormGroup({
      emailID: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }


  onLogin() {
    console.log('this.loginForm : ', this.loginForm.value);
    const email = this.loginForm.get('emailID').value;
    const password = this.loginForm.get('password').value;

    this._authLogin.loginUser(email, password).pipe(untilDestroyed(this)).subscribe(res => {
      console.log('Res back :', res);
      this.openSnackBar("Login Successfully ");
      this.router.navigate(['/dashboard']);
    }, err => {
      console.log('err : ', err.error.message);
      if (err.status === 0) {
        this.DB_Not_Responding('Dear, "' + this.loginForm.get('emailID').value + '" the DB server is not responding please refresh page by pressing (F5), If the problem still persists, contact "Azeem.Joseph@gmail.com" ');
      } else if (err.status === 404) {
        this.openSnackBar(err.error.message);
      } else {
        this.openSnackBar(err.error);
      }
    });
  }

  signUp() {
    console.log('signup called : ');
    this.router.navigate(['/signup']);
  }


  openSnackBar(message) {
    const action = 'Warning';
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

  DB_Not_Responding(message) {
    const action = 'Danger';
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

}
