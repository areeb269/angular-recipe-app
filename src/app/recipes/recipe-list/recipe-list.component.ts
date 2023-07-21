import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from '../recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipes[]
  subscription: Subscription;

  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() { //LOAD LIST OF RECIPES ON SCREEN
    this.subscription = this.recipeService.recipesChanged.subscribe(
      (recipes: Recipes[]) => {
        this.recipes = recipes;
      }
    );
    this.recipes = this.recipeService.getRecipes();
  }
  
  //NAVIGATE TO CREATE NEW RECIPE
  getRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
