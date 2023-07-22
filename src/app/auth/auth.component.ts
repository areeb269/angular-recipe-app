import { Component, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AuthServiceService, AuthResponseData } from './auth-service.service';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

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

  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;

  closeSub: Subscription;

  constructor(
    private authService: AuthServiceService,
    private router: Router // private viewContainerRef: ViewContainerRef //instead of component factory resolver
  ) {}

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
      this.authObservable = this.authService.login(email, password);
      // this.authService.login(email, password)
    } else {
      this.authObservable = this.authService.signUp(email, password);
      // this.authService.signUp(email, password)
    }

    this.authObservable.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        // this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    form.reset();
  }

  //*ngIf APPROACH FOR HANDLING ERRORS
  onHandleError() {
    console.log('on handle error');
    this.error = null;
  }

  //HANDLING ERROR THORUGH DYNAMIC COMPONENTS
  private showErrorAlert(message: string) {
    // const alertComRef = this.viewContainerRef.createComponent(AlertComponent);

    const hostContainerRef = this.alertHost.viewContainerRef;
    hostContainerRef.clear();

    const componentRef = hostContainerRef.createComponent(AlertComponent);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(()=>{
      this.closeSub.unsubscribe();
      hostContainerRef.clear();
    });
  }
}
