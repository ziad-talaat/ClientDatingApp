import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { ActivatedRoute } from '@angular/router';
import { photo } from '../../../types/photo';
import { ImageUpload } from "../../../Shared/image-upload/image-upload";
import { ToastService } from '../../../Core/services/toast-service';
import { AccountService } from '../../../Core/services/account-service';
import { user } from '../../../types/user';
import { Member } from '../../../types/Member';
import { StarButton } from "../../../Shared/star-button/star-button";
import { DeleteButton } from "../../../Shared/delete-button/delete-button";

@Component({
  selector: 'app-member-photos',
  imports: [ ImageUpload, StarButton, DeleteButton],
  templateUrl: './member-photos.html',
  styleUrl: './member-photos.css',
})
export class MemberPhotos implements OnInit {
  protected memberService=inject(MemberService);
  protected accountService=inject(AccountService);
  protected toastService=inject(ToastService);
  private route=inject(ActivatedRoute);
  protected photos=signal<photo[]>([]);
  protected loading=signal(false);



  ngOnInit(): void {
    const userId=this.route.parent?.snapshot.paramMap.get('id');
 if(userId){
   this.memberService.getMemberPhoto(userId).subscribe({
    next:data=>this.photos.set(data)
   });
}
}

onUploadImage(file:File){
this.loading.set(true);
this.memberService.uploadImage(file).subscribe({
  next:photo=>{
    
  //  const user= this.accountService.currentUser();
  //    user!.photoUrl=photo.photoUrl;
  //     this.accountService.setCurrentUser(user!);
      // this.memberService.member.update(member=>{
      //   if(!member)return member;
      //   return {
      //     ...member,
      //     photoUrl:photo.photoUrl,
      //   }
      // })
    this.memberService.editMode.set(false);
    this.loading.set(false);
    this.photos.update((old)=>{
      return [ ...old, photo]
    })
  },
    error:error=>{
    this.toastService.error("failed  to upload image");
    }
      
})
}


setMainPhoto(photo:photo){

  if(photo.photoUrl==this.accountService.currentUser()?.photoUrl)
  {
      this.memberService.unSetMainImage().subscribe({
        next:()=>{
          const currentUser= this.accountService.currentUser();
            if(currentUser){
             currentUser.photoUrl=undefined;
            }
             this.accountService.setCurrentUser(currentUser as user);

              this.memberService.member.update(member=>({
              ...member,
              photoUrl:undefined
             })as Member)
        }
      })
      return;
  }
  
this.memberService.setMainImage(photo).subscribe({
  next:result=>{
     const currentUser= this.accountService.currentUser();
     if(currentUser){
      currentUser.photoUrl=photo.photoUrl;
     }
     this.accountService.setCurrentUser(currentUser as user);
     this.memberService.member.update(member=>({
      ...member,
      photoUrl:photo.photoUrl
     })as Member)
  }
});
}


deletePhoto(photoId:number){
  this.memberService.deleteImage(photoId).subscribe({
    next:()=>this.photos.update(oldData=>oldData.filter(x=>x.photoId!=photoId))
  })
}



}
