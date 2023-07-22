import { NgModule } from '@angular/core';
import { AlertComponent } from './alert/alert.component';
import { DropdownDirectiveDirective } from './dropdown-directive.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    DropdownDirectiveDirective,
    PlaceholderDirective,
    AlertComponent,
  ],
  exports: [
    LoadingSpinnerComponent,
    DropdownDirectiveDirective,
    PlaceholderDirective,
    AlertComponent,
    CommonModule,
  ],
  imports: [CommonModule],
})
export class SharedModule {}
