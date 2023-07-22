import { Component, OnDestroy, OnInit } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service.service';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthServiceService } from '../auth/auth-service.service';
import { Subscription } from 'rxjs';
import { Recipes } from '../recipes/recipes.model';

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
    private authService: AuthServiceService,
    private recipeService:RecipeService,
  ) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      // this.isAuthenticated = !user ? false : true; SAME AS
      this.isAuthenticated = !!user;
      console.log(!user);
      console.log(!!user);
    });
  }

  onSave() {
    this.dsService.storeData();
  }

  onFetch() {
    // console.log("onFetch called");
    // this.dsService.fetchData();
    // console.log("fetchData service method: ",this.recipeService.getRecipes())
    this.dsService.fetchData().subscribe(
      (recipes: Recipes[]) => {
        console.log('Fetched recipes:', recipes);
        // You can do further processing with the fetched data here
      },
      (error) => {
        console.error('Error occurred while fetching data:', error);
      }
    );
    
    // console.log("onFetch called");
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
