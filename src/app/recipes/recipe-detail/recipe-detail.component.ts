import { Component, OnInit } from '@angular/core';
import { Recipes } from '../recipes.model';
import { RecipeService } from '../recipe-service.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipes;
  id!: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  ngOnInit() {
    //GET ITEM OF CURRENTLY SELECTED ID 
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    });
  }

  //ADD INGREDEINTS FROM RECIPE TO SHOPPING LIST
  onAddToShoppingList() {
    console.log(
      'to shopping list btn clicked' + JSON.stringify(this.recipe.ingredients)
    );
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  //NAVIGATE TO EDIT RECIPE PAGE
  editRecipe() {
    //-------------------↓ defining the path to where we need to navigate
    this.router.navigate(['../', 'edit', this.id], { relativeTo: this.route })
    //----------------------------------------------↑ relative to : current path 
  }

  //DELETE A RECIPE 
  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes'], { relativeTo: this.route })
  }
}
