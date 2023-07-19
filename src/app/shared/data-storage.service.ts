import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe-service.service';
import { Recipes } from '../recipes/recipes.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {


  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeData() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(`https://recipe-app-73805-default-rtdb.firebaseio.com/recipes.json`, recipes)
      .subscribe(
        (responseData) => {
          console.log(responseData)
        }
      )
  }

  fetchData() {
    this.http.get<Recipes[]>(`https://recipe-app-73805-default-rtdb.firebaseio.com/recipes.json`)
      .pipe(
        map((recipes) => {
          return recipes.map((recipe) => {
            return {
              ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []
            }
          })
        }

        ))
      .subscribe(
        (recipes) => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes)
        }
      )
  }
}
