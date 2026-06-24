import { Component, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../types/Member';
import { DatePipe } from '@angular/common';
import { MemberService } from '../../../Core/services/member-service';
import { FormsModule, NgForm } from '@angular/forms';
import { editMember } from '../../../types/editMember';
import { ToastService } from '../../../Core/services/toast-service';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe,FormsModule],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit,OnDestroy  {
 
  private route=inject(ActivatedRoute);
  protected member=signal<Member|undefined>(undefined);
  protected memberService=inject(MemberService);
  protected toastService=inject(ToastService);
   
   protected editMember:editMember={
    userName:'',
    description:'',
    city:'',
    country:''
   };


  
  

  ngOnInit(): void {
    this.route.parent?.data.subscribe({
      next:data=>this.member.set(data['member'])
    })
    
    this.editMember={
      userName:this.member()!.userName,
      description:this.member()?.description,
      city:this.member()!.city,
      country:this.member()!.country,
    }
  }


    editUser(dataForm:NgForm){
      this.editMember=dataForm.form.value;
      this.memberService.updateUser(this.editMember,this.member()!.id).subscribe({
        next:result=>{
          this.memberService.editMode.set(false);
          this.toastService.success(result.dataSet);
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
