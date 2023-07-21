import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthServiceService } from '../auth/auth-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  isAuthenticated: boolean = false;

  constructor(
    private dsService: DataStorageService,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(
      (user) => (this.isAuthenticated = !user ? false : true)
    );
  }

  onSave() {
    this.dsService.storeData();
  }

  onFetch() {
    // console.log("onFetch called");
    this.dsService.fetchData();

    // console.log("onFetch called");
  }

  ngOnDestroy(): void {}
}
