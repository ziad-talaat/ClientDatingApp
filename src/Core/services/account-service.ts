import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterCreds, user } from '../../types/user';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { FormGroup } from '@angular/forms';
import{loginRequest} from '../../types/loginRequest' 
import { LikesService } from './likes-service';
@Injectable({
  providedIn: 'root',
})
export class AccountService {
private http=inject(HttpClient);
private router=inject(Router);
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
   localStorage.setItem('user',JSON.stringify(user));
        this.currentUser.set(user);
        this.likeService.getLikeIds();
}




logout(){
  localStorage.removeItem('user');
  localStorage.removeItem('filters')
  this.currentUser.set(null);
  this.router.navigateByUrl('/');
  this.likeService.clearLikeIds();

}

refreshToken(token:string){
  return this.http.post<user>(`${this.baseUrl}account/generateNewAccessToken?token=${token}`, {},{
    withCredentials: true
  });
}



}