import { Component, effect, HostListener, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Member } from '../../../types/Member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../Core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { editMember } from '../../../types/editMember';
import { ToastService } from '../../../Core/services/toast-service';
import { finalize } from 'rxjs';
import { AccountService } from '../../../Core/services/account-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe,FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit,OnDestroy  {
 
  protected memberService=inject(MemberService);
  protected toastService=inject(ToastService);
  protected accounttService=inject(AccountService);
   
  @ViewChild('editForm') editForm!: NgForm;
   
  @HostListener('window:beforeunload',['$event'] ) notify($event:BeforeUnloadEvent){
    if(this.editForm?.dirty){
      $event.preventDefault();
    }
  }

   isSaving=signal(false);

   protected editMember:editMember={
    userName:'',
    description:'',
    city:'',
    country:''
   };


  ngOnInit(): void {
    this.editMember={
      userName:this.memberService.member()?.userName??"",
      description:this.memberService.member()?.description,
      city:this.memberService.member()?.city??"",
      country:this.memberService.member()?.country??"",
    }
  }

    editUser(dataForm:NgForm){
      this.isSaving.set(true);
       
      const updatedMember={
        ...this.memberService.member(),
        ...dataForm.form.value
      }


      this.memberService.updateUser(dataForm.form.value,this.memberService.member()!.id).pipe(finalize(()=>this.isSaving.set(false)))
      .subscribe({
        next:result=>{
        const  user=this.accounttService.currentUser();
        if(user && user.userName != updatedMember.userName){
          user.userName=updatedMember.userName;
          this.accounttService.setCurrentUser(user);
        }

          this.memberService.editMode.set(false);
          this.toastService.success(result.dataSet);
          this.memberService.member.set(updatedMember);
          this.editForm.reset(this.editForm.form.value);
        },
        error:error=>{
           this.toastService.error(error.dataSet);
        }
      })
    }



   ngOnDestroy(): void {
    this.memberService.editMode.set(false);
  }
}
