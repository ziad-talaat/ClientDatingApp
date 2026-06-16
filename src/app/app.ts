import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private  httpClient =inject(HttpClient);
  protected readonly title = signal('DatingApp');
  protected  members =signal<any>([])
  
  async ngOnInit() {
    // this.httpClient.get('http://localhost:5247/api/members').subscribe({
    //   next:res=>this.members.set(res),
    //   error:err=>console.error(err),
    //   complete:()=>console.log('completed the http response')
    // })
    this.members.set(await this.getMembers());
  }


  async getMembers(){
    try{
     return  lastValueFrom( this.httpClient.get('http://localhost:5247/api/members'));
    } catch(error){
      console.log(error);
      throw error;
    }


  }

}
