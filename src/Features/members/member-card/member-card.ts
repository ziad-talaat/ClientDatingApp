import { Component, computed, inject, input } from '@angular/core';
import { Member } from '../../../types/Member';
import { RouterLink } from "@angular/router";
import { LikesService } from '../../../Core/services/likes-service';

@Component({
  selector: 'app-member-card',
  imports: [RouterLink],
  templateUrl: './member-card.html',
  styleUrl: './member-card.css',
})
export class MemberCard {
member=input.required<Member>();
private likeService=inject(LikesService);

protected hasLiked=computed(()=>this.likeService.likedIds().includes(this.member().id));
  

  toggleLike(event:MouseEvent){
  event.stopPropagation();

  this.likeService.toggleLike(this.member().id).subscribe({
    next:()=>{
      if(this.hasLiked()){
        this.likeService.likedIds.update(ids=>ids.filter(id=>id!==this.member().id));
      }else{
        this.likeService.likedIds.update(ids=>[...ids,this.member().id]);
      }
    }
  });
  }
}
