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
     this.selectedUser = {
    ...user,
    roles: [...user.roles]
  };

    this.rolesModel.nativeElement.showModal();
   }



toggleRole(role: string, event: Event) {
  if(this.selectedUser == undefined ||this.selectedUser == null)return;

  const checked=(event.target as HTMLInputElement).checked;
  if(checked){
    console.log(role);
    this.selectedUser?.roles.push(role);
  } 
  else{
    this.selectedUser.roles=this.selectedUser?.roles.filter(r=>r!==role);
  }
}

 updateUserRoles(){
  if(this.selectedUser ===null)return;
  this.adminService.updateUserRoles(this.selectedUser?.id,this.selectedUser?.roles).subscribe({
    next:data=>{
      this.usersRoles.update(usersRoles=>{
        if(usersRoles ===null)return null;
        return  usersRoles.map(userRole=>{
          return  userRole.id !== this.selectedUser?.id? userRole: {...this.selectedUser}
        })
      })
   this.rolesModel.nativeElement.close();
    }
  })
 }


}
