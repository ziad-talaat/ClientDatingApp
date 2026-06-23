import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from '../../../types/Member';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-member-profile',
  imports: [DatePipe],
  templateUrl: './member-profile.html',
  styleUrl: './member-profile.css',
})
export class MemberProfile implements OnInit {
  private route=inject(ActivatedRoute);
  protected member=signal<Member|undefined>(undefined);
  
  ngOnInit(): void {
  //  let element= document.activeElement as HTMLElement;
  //  if(element)
  //   element.blur();

    this.route.parent?.data.subscribe({
      next:data=>this.member.set(data['member'])
    })
  }

}
