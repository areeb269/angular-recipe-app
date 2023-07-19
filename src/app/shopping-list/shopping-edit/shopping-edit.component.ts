import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shoppinglist-service.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements AfterViewInit, OnInit, OnDestroy {
  //EDIT SHOPPING LIST ITEM
  subscription: Subscription;
  editMode = false;
  editItemIndex: number;
  editedItem: Ingredient;

  //TO REFER TO AN ELEMENT IN THE TEMPLATE FILE
  @ViewChild('f', { static: false }) slForm: NgForm;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {
    //EDIT SHOPPING LIST ITEM
    this.subscription = this.slService.startedEditing.subscribe(
      (index: number) => {
        this.editItemIndex = index;
        this.editMode = true;
        this.editedItem = this.slService.getIngredient(index);
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        })
      })
  }

  ngAfterViewInit() { }

  //ADD OR EDIT SHOPPING LIST ITEM
  onSubmit(form: NgForm) {
    const values = form.value
    const newIngredient = new Ingredient(values.name, values.amount);

    if (this.editMode) {
      this.slService.updateIngredient(this.editItemIndex, newIngredient)
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    form.reset();
  }

  //CLEAR 'ADD INGREDIENT' FORM
  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  //DELETE INGREDIENT IN LIST
  onDelete() {
    this.slService.deleteIngredient(this.editItemIndex);
    this.onClear();
  }

  //DESTROY SUBSCRIPTION
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
