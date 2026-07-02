import { Component, inject, OnInit, signal } from '@angular/core';
import { LikesService } from '../../Core/services/likes-service';
import { predicate } from '../../types/predicates';
import { Member } from '../../types/Member';
import { MemberCard } from "../members/member-card/member-card";

@Component({
  selector: 'app-lists',
  imports: [MemberCard],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists implements OnInit {
  private likeservice=inject(LikesService);
  protected members=signal<Member[]>([]);
  protected predicate:string=predicate.liked.toString();
  
  tabs=[
    {label:'Liked',value:predicate.liked.toString()},
    {label:'Liked By',value:predicate.likedBy.toString()},
    {label:'mutual',value:predicate.mutual.toString()}
  ]
  
  ngOnInit(): void {
    this.loadLikes();
  }

  setPredicate(value:string){
   if(this.predicate!==value){
    this.predicate=value;
    this.loadLikes();
   }
  }

loadLikes(){
  this.likeservice.getLikes(this.predicate).subscribe({
    next:(data)=>this.members.set(data)
  })
}


}
