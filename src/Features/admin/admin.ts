import { Component, inject } from '@angular/core';
import { AccountService } from '../../Core/services/account-service';
import { PhotoManagment } from './photo-managment/photo-managment';
import { UserManagment } from './user-managment/user-managment';

@Component({
  selector: 'app-admin',
  imports: [PhotoManagment,UserManagment],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin {
protected accountService=inject(AccountService);
activeTab='photos';
tabs=[
  {label:'Photo Moderation',value:'photos'},
  {label:'User Managment',value:'roles'},
]
setTab(tab:string){
  this.activeTab=tab;
}



}
