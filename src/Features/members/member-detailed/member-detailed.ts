import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';
import { Member } from '../../../types/Member';
import { environment } from '../../../environments/environment';
import { AgePipe } from '../../../Core/pipes/age-pipe';
import { AccountService } from '../../../Core/services/account-service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MemberService } from '../../../Core/services/member-service';
import { PresenceService } from '../../../Core/services/presence-service';

@Component({
  selector: 'app-member-detailed',
  imports: [ RouterLink, RouterLinkActive,RouterOutlet,AgePipe],
  templateUrl: './member-detailed.html',
  styleUrl: './member-detailed.css',
})
export class MemberDetailed implements OnInit{

  private route=inject(ActivatedRoute);
  private router=inject(Router);
  private accountService=inject(AccountService);
  protected member=signal<Member|undefined>(undefined);
  protected title =signal<string|undefined>('Profile');
  protected memberService=inject(MemberService);
  protected presenceService=inject(PresenceService);
 
 protected routeId = toSignal(
  this.route.paramMap.pipe(
    map(params => params.get('id'))
  )
);


 protected isCurrentUser=computed(()=>{
  return this.accountService.currentUser()?.id ===  this.routeId();

 })



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
     
 



}
