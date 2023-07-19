import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs";

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient("Apples", 5),
    new Ingredient("Tomatoes", 7)
  ]

  //GET ALL INGREDIENTS OF A RECIPE
  getIngredients() {
    return this.ingredients.slice();
  }

  //GET ALL INGREDIENTS OF A RECIPE
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  //ADD INGREDIENT FROM RECIPE TO LIST
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients)
    this.ingredientsChanged.next(this.ingredients.slice());
    console.log("ingredients added: " + JSON.stringify(this.ingredients))
  }

  //ADD, UPDATE, DELETE ITEM IN LIST
  addIngredient(newItem: Ingredient) {
    this.ingredients.push(newItem);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
  deleteIngredient(index: number) {
    //remove/splice 1 ingredient after the index
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}