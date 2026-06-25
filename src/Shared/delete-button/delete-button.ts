import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  imports: [],
  templateUrl: './delete-button.html',
  styleUrl: './delete-button.css',
})
export class DeleteButton {

    disapled=input<boolean>();   
    selected=input<boolean>();   


   emitSetMainImageevent=output<Event>();
    

   emitSetMainImage(event:Event){
    this.emitSetMainImageevent.emit(event);
   }



}
