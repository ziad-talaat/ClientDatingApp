import { HttpClient, HttpContext, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../../types/Member';
import { photo } from '../../types/photo';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl=environment.apiUrl;
private httpClient=inject(HttpClient);

  getMembers(){
    return this.httpClient.get<Member[]>(this.baseUrl+'members');
  }
getMember(id:string){
    return this.httpClient.get<Member>(this.baseUrl+'members/'+id);
  }

getMemberPhoto(id:string){
    return this.httpClient.get<photo[]>(this.baseUrl+'members/'+id+'/photos');
  }


}
