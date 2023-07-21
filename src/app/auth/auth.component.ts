import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthServiceService } from './auth-service.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  isLogin = true;

  constructor(private authService: AuthServiceService) {}

  onSwitchMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    if (!form.valid) {
      return;
    }

    if (this.isLogin) {
      const email = form.value.email;
      const password = form.value.password;

      this.authService.signUp(email, password).subscribe(
        (resData) => {
          console.log(resData);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
    }

    form.reset();
  }
}
