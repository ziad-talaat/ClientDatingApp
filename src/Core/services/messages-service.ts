import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { pageResult } from '../../types/pageResult';
import { message } from '../../types/message';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { AccountService } from './account-service';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
 
   private baseUrl=environment.apiUrl;
   private httpClient=inject(HttpClient);
   private accountService=inject(AccountService);
   private hubUrl=environment.hubUrl;
   private hubConnection?:HubConnection;

   messages=signal<message[]>([]);

    createHubConnection(otherUserId:string){
      const currentUser=this.accountService.currentUser();
      if(!currentUser)return;

      this.hubConnection=new HubConnectionBuilder()
      .withUrl(this.hubUrl+'messages?userId='+otherUserId,{
        accessTokenFactory:()=>currentUser.token
      }).withAutomaticReconnect()
      .build();

      this.hubConnection.start().catch((err)=>console.log(err));

      this.hubConnection.on('ReceiveMessageThread',(thread:message[])=>{
        this.messages.set(thread.map(message=>({
              ...message,
              currentUserSender:message.senderId!==otherUserId
        })))
      });

      this.hubConnection.on('NewMessage',message=>{
        message.currentUserSender=message.senderId===currentUser.id;
        this.messages.update(oldMessages=>[...oldMessages,message])
      })
    }
    
    stopHubConnection(){
      if(this.hubConnection?.state===HubConnectionState.Connected){
        this.hubConnection.stop().catch(error=>console.log(error));
      }
    }



   getMessages(container:string,pageNumber:number,pageSize:number){
    let params=new HttpParams();
   params= params.append('pageSize',pageSize);
   params= params.append('currentPage',pageNumber);
   params= params.append('container',container);
   
   
   return  this.httpClient.get<pageResult<message>>(`${this.baseUrl}Messages`,{params});
   }

  getMessageThread(recipintId:string){
     let params=new HttpParams();
   params= params.append('recipientId',recipintId);
   
  return this.httpClient.post<message[]>(`${this.baseUrl}Messages/getMessagesThread`,{},{params},)
  }


  sendMessage(memberId:string,content:string){
    return this.hubConnection?.invoke('SendMessage',{recipientId:memberId,content});
  }
   
  deleteMessage(id:string){
   return this.httpClient.delete(`${this.baseUrl}Messages/${id}`);
  }

}
