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
    return this.http
      .get<Recipes[]>(
        'https://recipe-app-73805-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes) => {
          console.log('these are the recipes', recipes);
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
  }
}
