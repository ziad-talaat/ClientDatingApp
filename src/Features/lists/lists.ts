import { Component, inject, OnInit, signal } from '@angular/core';
import { LikesService } from '../../Core/services/likes-service';
import { predicate } from '../../types/predicates';
import { Member } from '../../types/Member';
import { MemberCard } from "../members/member-card/member-card";
import { Paginator } from "../../Shared/paginator/paginator";
import { pageResult } from '../../types/pageResult';
import { memberParams } from '../../types/MemberParams';

@Component({
  selector: 'app-lists',
  imports: [MemberCard, Paginator],
  templateUrl: './lists.html',
  styleUrl: './lists.css',
})
export class Lists implements OnInit {
  private likeservice=inject(LikesService);
  protected membersPage=signal<pageResult<Member>|null>(null);
  protected predicate:string=predicate.liked.toString();

  protected memberParams=new memberParams();
  
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
  this.likeservice.getLikes(this.predicate,this.memberParams).subscribe({
    next:(data)=>this.membersPage.set(data)
  })
}

onPageChange(event:{pageNumber:number,pageSize:number}){
  this.memberParams.currentPage=event.pageNumber;
  this.memberParams.pageSize=event.pageSize;
  this.loadLikes();
}

}
