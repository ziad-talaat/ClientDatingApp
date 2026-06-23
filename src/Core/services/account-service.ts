import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterCreds, user } from '../../types/user';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
private http=inject(HttpClient);
private router=inject(Router);
currentUser=signal<user|null>(null);



  private baseUrl=environment.apiUrl;


login(creds:any){
  return this.http.post<user>(this.baseUrl+'account/login',creds)
  .pipe(
    tap(user=>{
      if(user){
         this.setCurrentUser(user);
      }
    })
  );
}

register(creds:RegisterCreds){
  return this.http.post<user>(this.baseUrl+'account/register',creds)
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
}


logout(){
  localStorage.removeItem('user');
  this.currentUser.set(null);

}

}
