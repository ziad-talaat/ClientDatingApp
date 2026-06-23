import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { Member } from '../../../types/Member';
import { environment } from '../../../environments/environment';
import { AgePipe } from '../../../Core/pipes/age-pipe';
import { AccountService } from '../../../Core/services/account-service';

@Component({
  selector: 'app-member-detailed',
  imports: [ RouterLink, RouterLinkActive,RouterOutlet,AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit{
  ngOnInit(): void {
    // this.member$=this.loadMember();
     
    this.route.data.subscribe({
      next:data=>this.member.set(data['member'])
    })



    this.title.set(this.route.firstChild?.snapshot?.title);
    
    this.router.events.pipe(
      filter(event=>event instanceof NavigationEnd)).subscribe({
        next:()=>{
          this.title.set(this.route.firstChild?.snapshot?.title)
        }
      })
    
    }
    


  private route=inject(ActivatedRoute);
  private router=inject(Router);
  private accountService=inject(AccountService);

  protected member=signal<Member|undefined>(undefined);
 protected title =signal<string|undefined>('Profile');
  

 protected isCurrentUser=computed(()=>{
  return this.accountService.currentUser()?.id === this.route.snapshot.paramMap.get('id')
 })


}
