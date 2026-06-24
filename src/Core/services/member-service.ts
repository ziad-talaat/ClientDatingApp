import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../../types/Member';
import { photo } from '../../types/photo';
import { editMember } from '../../types/editMember';
import { resultResponse } from '../../types/resultResponse';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl=environment.apiUrl;
private httpClient=inject(HttpClient);

public editMode=signal(false);

  getMembers(){
    return this.httpClient.get<Member[]>(this.baseUrl+'members');
  }
getMember(id:string){
    return this.httpClient.get<Member>(this.baseUrl+'members/'+id);
  }

getMemberPhoto(id:string){
    return this.httpClient.get<photo[]>(this.baseUrl+'members/'+id+'/photos');
  }
   toggleEditMode(){
      this.editMode.set(!this.editMode());
    }

    updateUser(user:editMember,id:string){
      return this.httpClient.put<resultResponse<string>>(this.baseUrl+'members/'+id,user);
    }

}
