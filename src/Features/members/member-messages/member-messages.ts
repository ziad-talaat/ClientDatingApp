import { Component, effect, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { MessagesService } from '../../../Core/services/messages-service';
import { MemberService } from '../../../Core/services/member-service';
import { message } from '../../../types/message';
import { AccountService } from '../../../Core/services/account-service';
import { DatePipe } from '@angular/common';
import { TimeAgoPipe } from '../../../Core/pipes/time-ago-pipe';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../Core/services/toast-service';
import { PresenceService } from '../../../Core/services/presence-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-messages',
  imports: [ DatePipe,TimeAgoPipe,FormsModule],
  templateUrl: './member-messages.html',
  styleUrl: './member-messages.css',
})
export class MemberMessages implements OnInit,OnDestroy {
  
  protected messageService=inject(MessagesService);
  private memberService=inject(MemberService);
  protected accountService=inject(AccountService);
  protected messageContent='';
   protected presenceService=inject(PresenceService); 
   private route=inject(ActivatedRoute);

  @ViewChild('messageEndRef')messageRef!:ElementRef;
  
  constructor(){
   effect(()=>{
    const currentMessages=this.messageService.messages();
    if(currentMessages && currentMessages.length>0){
        this.scrollToBottom();
    }
   })
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  ngOnInit(): void {
    this.route.parent?.params.subscribe({
      next:(params)=>{
        const otherUSerId=params['id'];
        if(!otherUSerId)throw new Error("cannot connect to hub");
        this.messageService.createHubConnection(otherUSerId);
      }
    })
  }



  sendMessage(){
    const recipientId=this.memberService.member()?.id;
    if(!recipientId || this.messageContent==='') return;

    this.messageService.sendMessage(recipientId,this.messageContent)?.then(()=>{
      this.messageContent='';
    });
  }






   
  scrollToBottom(){
    setTimeout(()=>{
      if(this.messageRef){
        this.messageRef.nativeElement.scrollIntoView({behavior:'smooth'})
      }
    })
  }


}
