import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../Layout/nav/nav";
import { AccountService } from '../Core/services/account-service';
import { Home } from "../Features/home/home";
import { user } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private  httpClient =inject(HttpClient);
  private  accountService =inject(AccountService);
  protected readonly title = signal('DatingApp');
  protected  members =signal<user[]>([])
  
  async ngOnInit() {
    // this.httpClient.get('http://localhost:5247/api/members').subscribe({
    //   next:res=>this.members.set(res),
    //   error:err=>console.error(err),
    //   complete:()=>console.log('completed the http response')
    // })
    this.members.set(await this.getMembers());
    this.setCurrentUser();
  }


  setCurrentUser(){
    const userString=localStorage.getItem('user');
    if(!userString)
      return;

    const user=JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  async getMembers(){
    try{
     return  lastValueFrom( this.httpClient.get<user[]>('http://localhost:5247/api/members'));
    } catch(error){
      console.log(error);
      throw error;
    }


  }

}
