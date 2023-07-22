import { AuthServiceService } from './auth/auth-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthServiceService){}
  ngOnInit(): void {

    this.authService.autoLogin()
  }

}
