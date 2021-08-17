import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UntilDestroy,untilDestroyed } from '@ngneat/until-destroy';
import { SignupService } from '../api-services/signup.service';

@UntilDestroy()

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {


  form: FormGroup;
  public loginInvalid = true;
  private formSubmitAttempt = false;
  private returnUrl: string;
  signupform: FormGroup;

  constructor(private _authsignUp: SignupService, private snackBar: MatSnackBar, private router: Router) {
  }

  ngOnInit() {
    this.signupform = new FormGroup({
      emailID: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  onSignUp() {
    console.log('this.signupform : ', this.signupform.value);
    const email = this.signupform.get('emailID').value;
    const password = this.signupform.get('password').value;

    this._authsignUp.signUpUser(email, password).pipe(untilDestroyed(this)).subscribe(res => {
      console.log('Res back :', res);
      this.openSnackBar("SignUp Successfully ");
      this.router.navigate(['/login']);
    }, err => {
      console.log('err : ', err.error.message);
      if (err.status === 0) {
        this.DB_Not_Responding('Dear, "' + this.signupform.get('emailID').value + '" the DB server is not responding please refresh page by pressing (F5), If the problem still persists, contact "Azeem.Joseph@gmail.com" ');
      } else if (err.status === 404) {
        this.openSnackBar(err.error.message);
      } else {
        this.openSnackBar(err.error);
      }
    });
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
