import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../../types/Member';
import { photo } from '../../types/photo';
import { editMember } from '../../types/editMember';
import { resultResponse } from '../../types/resultResponse';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl=environment.apiUrl;
private httpClient=inject(HttpClient);

public editMode=signal(false);

  member=signal<Member|null>(null);

  getMembers(){
    return this.httpClient.get<Member[]>(this.baseUrl+'members');
  }
getMember(id:string){
    return this.httpClient.get<Member>(this.baseUrl+'members/'+id).pipe(tap(data=>this.member.set(data)));
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

     deleteImage(photoId:number){
      return this.httpClient.delete<boolean>(this.baseUrl+'members/remove-photo/'+photoId);
    }

    uploadImage(file:File){
      const formData=new FormData();
      formData.append('file',file);
     return  this.httpClient.post<photo>(`${this.baseUrl}members/add-photo`,formData);
    }


    setMainImage(photo:photo){
      console.log(photo);
  console.log(photo.photoId);
     return this.httpClient.put(`${this.baseUrl}members/set-main-photo/${photo.photoId}`,null)
    }

}
