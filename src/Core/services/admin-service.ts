import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { userRoles } from '../../types/userRoles';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  
  protected baseUrl=environment.apiUrl;
  private httpCliet=inject(HttpClient);
   
  getUserWithRoles(){
    return this.httpCliet.get<userRoles[]>(`${this.baseUrl}Admin/users-with-roles`);
  }
   

  updateUserRoles(userId:string,roles:string[]){
   return this.httpCliet
   .post<string[]>(`${this.baseUrl}admin/edit-roles/${userId}?roles=${roles}`,{});
  }


}
