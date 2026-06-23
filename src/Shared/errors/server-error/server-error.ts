import { Component } from '@angular/core';
import { ApiError } from '../../../types/error';

@Component({
  selector: 'app-server-error',
  imports: [],
  templateUrl: './server-error.html',
  styleUrl: './server-error.css',
})
export class ServerError {

  protected error:ApiError;
  protected showDetails=false;
constructor() {
 this.error=history.state;
 console.log(history.state);
 
}

detailsToggle(){
   this.showDetails= !this.showDetails;
}
}