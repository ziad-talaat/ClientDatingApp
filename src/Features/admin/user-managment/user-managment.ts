import { Component, ElementRef, inject, OnInit, signal, ViewChild } from '@angular/core';
import { AdminService } from '../../../Core/services/admin-service';
import { userRoles } from '../../../types/userRoles';
import { user } from '../../../types/user';

@Component({
  selector: 'app-user-managment',
  imports: [],
  templateUrl: './user-managment.html',
  styleUrl: './user-managment.css',
})
export class UserManagment implements OnInit {
  private adminService=inject(AdminService)
  protected usersRoles=signal<userRoles[]|null>(null);
   
  @ViewChild('rolesModel')rolesModel!:ElementRef<HTMLDialogElement>;

  protected availableRoles=['Member','Admin','Moderator'];
  protected selectedUser:userRoles|null=null;

   ngOnInit(): void {
    this.loadUserRoles();
  }


  loadUserRoles(){
    this.adminService.getUserWithRoles().subscribe({
      next:userRoles=>this.usersRoles.set(userRoles),
    })
  }


   openRolesModel(user:userRoles){
    this.selectedUser=user;
    this.rolesModel.nativeElement.showModal();
   }




//  updateUserRoles(userId:string,roles:string[]){
//   this.adminService.updateUserRoles(userId,roles).subscribe({
//     next:data=>this.usersRoles.update(x=>{
//       return [...x,x.us]
//     })
//   })
//  }


}
