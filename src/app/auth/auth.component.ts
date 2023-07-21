import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthServiceService, AuthResponseData } from './auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogin = true;
  isLoading = false;
  error: string = null;

  authObservable: Observable<AuthResponseData>;

  constructor(private authService: AuthServiceService, private router:Router) {}

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLogin) {
      this.authObservable = this.authService.login(email, password)
      // this.authService.login(email, password)
    } else {
      this.authObservable = this.authService.signUp(email, password)
      // this.authService.signUp(email, password)
    }

    this.authObservable.subscribe(
        (resData) => {
          console.log(resData);
          this.router.navigate(['/recipes'])
          this.isLoading = false;
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );

    form.reset();
  }
}
