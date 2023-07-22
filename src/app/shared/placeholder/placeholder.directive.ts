import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})
export class PlaceholderDirective {

  //HANDLING ERROR THORUGH DYNAMIC COMPONENTS
  constructor(
    public viewContainerRef: ViewContainerRef
  ) {}

}
