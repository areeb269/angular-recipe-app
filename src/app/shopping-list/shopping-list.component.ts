import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppinglist-service.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private ingChange: Subscription

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    //DISPLAY LIST OF ALL INGREDIENTS
    this.ingredients = this.slService.getIngredients();
    this.ingChange = this.slService.ingredientsChanged.subscribe(
      (ing: Ingredient[]) => {
        this.ingredients = ing;
      }
    )
  }

  //ON CLICKING ITEM GO TO EDIT MODE
  onEdit(index: number) {
    this.slService.startedEditing.next(index);
  }

  //DESTROY SUBSCRIPTION
  ngOnDestroy(): void {
    this.ingChange.unsubscribe()
  }
}
