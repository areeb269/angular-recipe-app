import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service.service';
import { Recipes } from '../recipes/recipes.model';
import { map, take, exhaustMap, tap } from 'rxjs/operators';
import { AuthServiceService } from '../auth/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthServiceService
  ) {}

  storeData() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        `https://recipe-app-73805-default-rtdb.firebaseio.com/recipes.json`,
        recipes
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  fetchData() {
    const data = this.authService.user.pipe(user=>this.http.get<Recipes[]>(
      'https://recipe-app-73805-default-rtdb.firebaseio.com/recipes.json?auth=' +
        user.token
      // {
      //   params: new HttpParams().set('auth', user.token),
      // }
    ))


    try {return this.authService.user.pipe(
      //TAKE 1 VALUE AND UNSUBSCRIBE AFTER THAT
      take(1),
      exhaustMap((user) => {
        //EXHAUST CARRIES OUT PREVIOUS OBSERVABLE FIRST ('user') AND THEN PROCESSES THAT DATA AND REPLACES IT WITH NEW ONE
        return this.http.get<Recipes[]>(
          'https://recipe-app-73805-default-rtdb.firebaseio.com/recipes.json?auth=' +
            user.token
          // {
          //   params: new HttpParams().set('auth', user.token),
          // }
        );
      }),
      map((recipes) => {
        console.log('these are the recipes' + recipes);
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
      
    } catch (error) {
      console.log(error)
      
    }
    
  }
}
