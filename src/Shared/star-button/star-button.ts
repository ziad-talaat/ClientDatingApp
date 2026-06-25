import { Component, inject, input, output } from '@angular/core';
import { MemberService } from '../../Core/services/member-service';
import { photo } from '../../types/photo';

@Component({
  selector: 'app-star-button',
  imports: [],
  templateUrl: './star-button.html',
  styleUrl: './star-button.css',
})
export class StarButton {
 

    disapled=input<boolean>();   
    selected=input<boolean>();   


   emitSetMainImageevent=output<Event>();
    

   emitSetMainImage(event:Event){
    this.emitSetMainImageevent.emit(event);
   }


}
