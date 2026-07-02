import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { Member } from '../../types/Member';
import { photo } from '../../types/photo';
import { editMember } from '../../types/editMember';
import { resultResponse } from '../../types/resultResponse';
import { tap } from 'rxjs';
import { pageResult } from '../../types/pageResult';
import { memberParams } from '../../types/MemberParams';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  private baseUrl=environment.apiUrl;
private httpClient=inject(HttpClient);

public editMode=signal(false);

  member=signal<Member|null>(null);

  getMembers( memberParams:memberParams){ 
    let params=new HttpParams();
    params=params.append('currentPage',memberParams.currentPage);
    params=params.append('pageSize',memberParams.pageSize);
    params=params.append('minAge',memberParams.minAge);
    params=params.append('maxAge',memberParams.maxAge);
    params=params.append('orderBy',memberParams.orderBy);
    if(memberParams.gender) params=params.append('gender',memberParams.gender);
    return this.httpClient.get<pageResult<Member>>(`${this.baseUrl}members`,{params}).pipe(
      tap(()=>{
        localStorage.setItem('filters',JSON.stringify(memberParams));
      })
    );
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
    
     return this.httpClient.put(`${this.baseUrl}members/set-main-photo/${photo.photoId}`,null)
    }


    unSetMainImage(){
     return this.httpClient.post(`${this.baseUrl}members/disaple-main-image`,null);
    }



    getFiltersParams(){
     let params =  new memberParams();
     params=JSON.parse(localStorage.getItem('filters')!);
      return params;
    }
}
