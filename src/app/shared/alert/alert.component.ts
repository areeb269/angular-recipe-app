import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {
  
  // *ngIf APPROACH FOR HANDLING ERRORS 
  @Input() message: string = 'ello'
  @Output() close = new EventEmitter<void>();

  onClose(){
    console.log("on close");
    this.close.emit();
  }

}
