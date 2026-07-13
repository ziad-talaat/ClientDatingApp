import { Component, inject, OnInit, signal } from '@angular/core';
import { MessagesService } from '../../Core/services/messages-service';
import { pageResult } from '../../types/pageResult';
import { message } from '../../types/message';
import { Paginator } from "../../Shared/paginator/paginator";
import { RouterLink } from "@angular/router";
import { DatePipe } from '@angular/common';
import { ConfirmDilogService } from '../../Core/services/confirm-dilog-service';

@Component({
  selector: 'app-messages',
  imports: [Paginator, RouterLink,DatePipe],
  templateUrl: './messages.html',
  styleUrl: './messages.css',
})
export class Messages implements OnInit {
  
  private messagesService=inject(MessagesService);
  protected container='inbox';
  protected pageNumber=1;
  protected pageSize=10;
  protected paginatedMessages=signal<pageResult<message>|null>(null);
   protected fetchedContainer='inbox';

   private confirmDialog=inject(ConfirmDilogService);

  
   tabs=[
    {label:"Inbox",value:'inbox'},
    {label:"Outbox",value:'outbox'},
   ]

  ngOnInit(): void {
   this.loadMessages();
  }
loadMessages(){
  this.messagesService.getMessages(this.container,this.pageNumber,this.pageSize).subscribe({
    next:data=>{
      this.paginatedMessages.set(data)
      this.fetchedContainer=this.container;
    }
  });
}

 get isInbox(){
  return this.fetchedContainer==="inbox";
 }



 setContainer(cont:string ){
  if(cont !==this.container){
    this.container=cont;
    this.pageNumber=1;
    this.loadMessages();
  }
 }


onPageChange(event:{pageNumber:number,pageSize:number}){
  this.pageNumber=event.pageNumber;
  this.pageSize=event.pageSize;
  this.loadMessages();
}



async confirmDelete(event:Event,id:string){
  event.stopPropagation();
  const ok= await this.confirmDialog.confirm("are you sure you want to deete this message");
  if(ok)this.deleteMessage(id);
}

deleteMessage(id:string){
  this.messagesService.deleteMessage(id).subscribe({
    next:()=>{
      this.paginatedMessages.update(messages=>{
        if (!messages) return null;

        return {
          ...messages,
          pageResult: messages.pageResult.filter(m => m.id !== id)
        };
      })
    }
  });
}

}
