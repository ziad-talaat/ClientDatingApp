import { Component, inject, OnInit } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { photo } from '../../../types/photo';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-photos',
  imports: [AsyncPipe],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
  private photoService=inject(MemberService);
  private route=inject(ActivatedRoute);
  protected photos$?:Observable<photo[]>;

  ngOnInit(): void {
    
    const userId=this.route.parent?.snapshot.paramMap.get('id');
 if(userId){
 
  this.photos$=this.photoService.getMemberPhoto(userId);
}
}
 
 get photoMock(){
 
  return Array.from({length:20},(_,i)=>({
    url:'/spider.png'
  }))
 }

}
