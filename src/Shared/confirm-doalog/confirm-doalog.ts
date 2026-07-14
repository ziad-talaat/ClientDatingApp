import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ConfirmDilogService } from '../../Core/services/confirm-dilog-service';

@Component({
  selector: 'app-confirm-doalog',
  imports: [],
  templateUrl: './confirm-doalog.html',
  styleUrl: './confirm-doalog.css',
})
export class ConfirmDoalog {
  
  @ViewChild('dialogRef')dialogRef!:ElementRef<HTMLDialogElement>;
  message="Are you sure";

   
  private resolver:((result:boolean)=>void )|null=null;
  
constructor(){
  inject(ConfirmDilogService).register(this)
}

open(message:string):Promise<boolean>{
this.message=message;
this.dialogRef.nativeElement.showModal();
return new Promise(resolve=>(this.resolver=resolve));
}

confirm(){
  this.dialogRef.nativeElement.close();
  this.resolver?.(true);
  this.resolver=null;
}
cancel(){
  this.dialogRef.nativeElement.close();
  this.resolver?.(false);
  this.resolver=null;
}


}
