import { Component, effect, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MessagesService } from '../../../Core/services/messages-service';
import { MemberService } from '../../../Core/services/member-service';
import { message } from '../../../types/message';
import { AccountService } from '../../../Core/services/account-service';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../Core/pipes/time-ago-pipe';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../Core/services/toast-service';

@Component({
  selector: 'app-member-messages',
  imports: [ DatePipe,TimeAgoPipe,FormsModule],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css',
})
export class MemberMessages implements OnInit {
  
  private messageService=inject(MessagesService);
  private memberService=inject(MemberService);
  protected accountService=inject(AccountService);
  protected messages=signal<message[]|null>(null);
  protected messageContent='';
   
  @ViewChild('messageEndRef')messageRef!:ElementRef;
  
  constructor(){
   effect(()=>{
    const currentMessages=this.messages();
    if(currentMessages && currentMessages.length>0){
        this.scrollToBottom();
    }
   })
  }
  ngOnInit(): void {
    this.loadMessages();
  }


  loadMessages(){
    const memberId=this.memberService.member()?.id;
    if(memberId){
      this.messageService.getMessageThread(memberId).subscribe({
        next:data=>this.messages.set(data)
      })
    }
  }

  sendMessage(){
    const recipientId=this.memberService.member()?.id;
    if(!recipientId || this.messageContent==='') return;

    this.messageService.sendMessage(recipientId,this.messageContent).subscribe({
      next:data=>{
        this.messages.update(messages=>{
        if(!messages ||messages.length==0)
          return [data];
        return [...messages,data];
      })
      this.messageContent='';
    }
    })
  }






   
  scrollToBottom(){
    setTimeout(()=>{
      if(this.messageRef){
        this.messageRef.nativeElement.scrollIntoView({behavior:'smooth'})
      }
    })
  }


}
