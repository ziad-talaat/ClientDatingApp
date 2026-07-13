import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { userRoles } from '../../types/userRoles';
import { photo } from '../../types/photo';

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

  getApproavableImages(){
    return this.httpCliet.get<photo[]>(`${this.baseUrl}admin/get-approvable-Images`);
  }

  approaveImage(id:number,isApproave:boolean){
     let params=new HttpParams();
    params=params.append('imageId',id);
    params=params.append('isApproaved',isApproave);
    return this.httpCliet.post(`${this.baseUrl}admin/Approave-image`,{},{params});
  }


}
