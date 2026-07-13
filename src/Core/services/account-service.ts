import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterCreds, user } from '../../types/user';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';
import{loginRequest} from '../../types/loginRequest' 
import { LikesService } from './likes-service';
import { PresenceService } from './presence-service';
import { HubConnectionState } from '@microsoft/signalr';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
private http=inject(HttpClient);
private router=inject(Router);
private presenceService=inject(PresenceService);
currentUser=signal<user|null>(null);
private baseUrl=environment.apiUrl;

private likeService=inject(LikesService);

login(creds:loginRequest){
  return this.http.post<user>(this.baseUrl+'account/login',creds,{withCredentials:true})
  .pipe(
    tap(user=>{
      if(user){
         this.setCurrentUser(user);
      }
    })
  );
}

register(creds:RegisterCreds){
  return this.http.post<user>(this.baseUrl+'account/register',creds,{withCredentials:true})
  .pipe(
    tap(user=>{
      if(user){
      this.setCurrentUser(user);
      }
    })
  );
}

setCurrentUser(user:user){
  user.role= this.getRolesFromUserToken(user); 
        this.currentUser.set(user);
        this.likeService.getLikeIds();
  
        if(this.presenceService.hubConnection?.state !== HubConnectionState.Connected){
           this.presenceService.createHubConnection(user);
        }
}




logout(){
  this.http.post(`${this.baseUrl}account/logout`,{},{withCredentials:true}).subscribe({
    next:()=>{
  localStorage.removeItem('filters')
  this.currentUser.set(null);
  // this.router.navigateByUrl('/');
  this.likeService.clearLikeIds();
  this.presenceService.stopHubConnection();

    }
  });
 
}

refreshToken(){
  return this.http.post<user>(`${this.baseUrl}account/generateNewAccessToken`, {},{
    withCredentials: true
  });
}


private getRolesFromUserToken(user:user):string[]{
  const payload=user?.token.split('.')[1];
  const decoded=atob(payload);
   
  const jsonPayload=JSON.parse(decoded);

  return Array.isArray(jsonPayload.role) ? jsonPayload.role  : [jsonPayload.role];

}





}