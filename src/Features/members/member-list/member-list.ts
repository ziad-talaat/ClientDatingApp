import { Component, inject, OnInit, signal } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { Member } from '../../../types/Member';
import { ToastService } from '../../../Core/services/toast-service';
import { catchError, Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { MemberCard } from "../member-card/member-card";
import { AccountService } from '../../../Core/services/account-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-list',
  imports: [AsyncPipe, MemberCard],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
  private memberService=inject(MemberService);
  private accountService=inject(AccountService);
  private router=inject(Router);

   protected members$! : Observable<Member[]>;

  ngOnInit(): void {
    this.members$=this.memberService.getMembers();
  }

}
