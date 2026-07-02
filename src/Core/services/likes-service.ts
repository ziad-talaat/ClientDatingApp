import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Member } from '../../types/Member';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikesService {
  private baseUrl=environment.apiUrl;
  private httpClient=inject(HttpClient);

  likedIds =signal<string[]>([]);

  toggleLike(id:string){
   return this.httpClient.post(`${this.baseUrl}likes/${id}`,{});
  }
  
  getLikes(predicate:string){
   return this.httpClient.get<Member[]>(`${this.baseUrl}likes?likeType=${predicate}`);
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
