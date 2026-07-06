import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { pageResult } from '../../types/pageResult';
import { memberParams } from '../../types/MemberParams';
import { message } from '../../types/message';

@Injectable({
  providedIn: 'root',
})
export class MessagesService {
 
   private baseUrl=environment.apiUrl;
   private httpClient=inject(HttpClient);


   getMessages(container:string,pageNumber:number,pageSize:number){
    let params=new HttpParams();
   params= params.append('pageSize',pageSize);
   params= params.append('currentPage',pageNumber);
   params= params.append('container',container);
   
   
   return  this.httpClient.get<pageResult<message>>(`${this.baseUrl}Messages`,{params});
   }

  getMessageThread(recipintId:string){
     let params=new HttpParams();
   params= params.append('recipientId',recipintId);
   
  return this.httpClient.post<message[]>(`${this.baseUrl}Messages/getMessagesThread`,{},{params},)
  }


  sendMessage(memberId:string,content:string){
    return this.httpClient.post<message>(`${this.baseUrl}Messages`,{recipientId:memberId,content})
  }
   
  deleteMessage(id:string){
   return this.httpClient.delete(`${this.baseUrl}Messages/${id}`);
  }

}
