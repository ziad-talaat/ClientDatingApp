import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { ToastService } from './toast-service';
import { user } from '../../types/user';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';
import { message } from '../../types/message';

@Injectable({
  providedIn: 'root',
})
export class PresenceService {
  private hubUrl=environment.hubUrl;
  private toastService=inject(ToastService);
  hubConnection?:HubConnection;
   
  onLineUsers=signal<string[]>([]);

   


  createHubConnection( user:user){
    this.hubConnection=new HubConnectionBuilder().withUrl(this.hubUrl+'presence',{
      accessTokenFactory:()=>user.token
    })
     .withAutomaticReconnect()
     .build();
    
     this.hubConnection.start()
     .catch(error=>console.log(error));
  
     this.hubConnection.on('UserOnline',userId=>{
     this.onLineUsers.update(oldUsers=>[...oldUsers,userId])
     });
  this.hubConnection.on('UserOffline',userId=>{
     this.onLineUsers.update(users=>users.filter(x=> x !== userId))    
  });
   

  this.hubConnection.on('GetOnLineUsers',userIds=>{
    this.onLineUsers.set(userIds);
  });

      this.hubConnection.on('MessageRecieved',(message :message)=>{
           this.toastService.info(message.senderName +' has sent you a message',2000,message.senderImageUrl,`/members/${message.senderId}/Messages`);
      }); 


}
stopHubConnection(){
  if(this.hubConnection?.state===HubConnectionState.Connected){
  this.hubConnection.stop()
  .catch(err=>console.log(err));
  }
}





}

