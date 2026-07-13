import { Injectable } from '@angular/core';
import { ConfirmDoalog } from '../../Shared/confirm-doalog/confirm-doalog';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDilogService {
 
  private dialogComponent?:ConfirmDoalog;

  register(component:ConfirmDoalog){
   this.dialogComponent=component;
  }


  confirm(message='Are you sure'):Promise<boolean>{
    if(!this.dialogComponent){
      throw new Error("Confirm dialog component is not registerd");
    }
    return this.dialogComponent.open(message);
  }



}
