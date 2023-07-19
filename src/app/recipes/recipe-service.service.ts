import { Injectable } from "@angular/core"
import { Recipes } from "./recipes.model"
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppinglist-service.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipes[]>();

    private recipes: Recipes[] = [];

    // = [
    //     new Recipes(
    //         'Chocolate chip cookies',
    //         'This is how you make chocolate chip cookies!',
    //         'https://cdn.pixabay.com/photo/2017/07/31/23/31/chocolate-chip-2562000_640.jpg',
    //         [
    //             new Ingredient('Flour', 1),
    //             new Ingredient('Eggs', 3),
    //             new Ingredient('Butter', 1),
    //             new Ingredient('Brown Sugar', 1),
    //             new Ingredient('White Sugar', 1)
    //         ]),

    //     new Recipes(
    //         'Brownies',
    //         'This is how you make brownies!',
    //         'https://cdn.pixabay.com/photo/2017/10/16/15/17/brownie-2857462_640.jpg',
    //         [
    //             new Ingredient('Flour', 1),
    //             new Ingredient('Eggs', 3),
    //             new Ingredient('Butter', 1),
    //             new Ingredient('Brown Sugar', 1),
    //             new Ingredient('White Sugar', 1),
    //             new Ingredient('Chocolate', 4)
    //         ]),
    // ]

    constructor(private slService: ShoppingListService) { }

    getRecipes() {
        return this.recipes.slice();
    }

    setRecipes(recipes: Recipes[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }

    getRecipe(id: number) {
        return this.recipes[id];
    }

    addRecipe(newRecipe: Recipes) {
        this.recipes.push(newRecipe);
        this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, updatedRecipe: Recipes) {
        this.recipes[index] = updatedRecipe;
        this.recipesChanged.next(this.recipes.slice());
        // console.log("update recipe service: " + JSON.stringify(this.recipesChanged));
    }

    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}