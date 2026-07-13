import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Member } from '../../types/Member';
import { tap } from 'rxjs';
import { pageResult } from '../../types/pageResult';
import { memberParams } from '../../types/MemberParams';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private baseUrl=environment.apiUrl;
  private httpClient=inject(HttpClient);

  likedIds =signal<string[]>([]);

  toggleLike(id:string){
   return this.httpClient.post(`${this.baseUrl}likes/${id}`,{}).subscribe({
    next:()=>{
      if(this.likedIds().includes(id)){
        this.likedIds.update(ids=>ids.filter(x=>x !==id));
      }else{
        this.likedIds.update(ids=>[...ids,id]);
      }
    }
  });;
  }
  
  getLikes(predicate:string,memberParams:memberParams){
    let params=new HttpParams();
    params=params.append('currentPage',memberParams.currentPage);
    params=params.append('pageSize',memberParams.pageSize);
    params=params.append('minAge',memberParams.minAge);
    params=params.append('maxAge',memberParams.maxAge);
    params=params.append('orderBy',memberParams.orderBy);
    params=params.append('likeType',predicate);
    if(memberParams.gender) params=params.append('gender',memberParams.gender);

    
   return this.httpClient.get<pageResult<Member>>(`${this.baseUrl}likes`,{params});
  }
   
  getLikeIds(){
    return this.httpClient.get<string[]>(`${this.baseUrl}likes/list`)
    .subscribe({
      next:(data)=> this.likedIds.set(data)
    });
  }

  clearLikeIds(){
    this.likedIds.set([]);  
  }


}
