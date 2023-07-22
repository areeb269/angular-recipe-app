import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],

  imports: [
      RouterModule,
      FormsModule,
      SharedModule,
      RouterModule.forChild([
        { path: 'shopping-list', component: ShoppingListComponent },
      ]),
  ],
})
export class ShoppingListModule {}
