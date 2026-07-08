import { Component, inject, OnInit } from '@angular/core';
import { AccountService } from '../../Core/services/account-service';
import { PhotoManagment } from './photo-managment/photo-managment';
import { UserManagment } from './user-managment/user-managment';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-admin',
  imports: [PhotoManagment, UserManagment, RouterLink],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class Admin implements OnInit {
  private route=inject(ActivatedRoute);

protected accountService=inject(AccountService);
activeTab='photos';
tabs=[
  {label:'Photo Moderation',value:'photos'},
  {label:'User Managment',value:'roles'},
]
setTab(tab:string){
  this.activeTab=tab;
}


ngOnInit(): void {
  const childPath =  this.route.firstChild?.snapshot.routeConfig?.path;
if (childPath === 'photosManagment') {
  this.activeTab = 'photos';
} else if (childPath === 'userManagment') {
  this.activeTab = 'roles';
}
}

}
