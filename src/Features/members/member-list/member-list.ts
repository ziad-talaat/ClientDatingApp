import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { MemberService } from '../../../Core/services/member-service';
import { Member } from '../../../types/Member';
import { MemberCard } from "../member-card/member-card";
import { pageResult } from '../../../types/pageResult';
import { Paginator } from "../../../Shared/paginator/paginator";
import { memberParams } from '../../../types/MemberParams';
import { FilterModel } from '../filter-model/filter-model';

@Component({
  selector: 'app-member-list',
  imports: [MemberCard, Paginator, FilterModel],
  templateUrl: './member-list.html',
  styleUrl: './member-list.css',
})
export class MemberList implements OnInit {
  @ViewChild("filterModal")modal!:FilterModel;
  private memberService=inject(MemberService);
  protected members=signal<pageResult<Member>|null>(null);
   
 protected memberParams=new memberParams();
 protected updatedMemberParams=new memberParams();
  
 


  ngOnInit(): void {
     const reservedParams= this.memberService.getFiltersParams();
     if(reservedParams)
     {
      this.memberParams=reservedParams;
      this.updatedMemberParams=reservedParams;
     }
    this.loadMembers();
  }
  
  
  loadMembers(){
    this.memberService.getMembers(this.memberParams).subscribe({
      next:(data)=>this.members.set(data)
    });
  }


   
 onPageChange(event:{pageNumber:number,pageSize:number}){
  this.memberParams.currentPage=event.pageNumber;
  this.memberParams.pageSize=event.pageSize;
  this.loadMembers();
}

 
 openModal(){
  this.modal.open();
 }
onClose(){
  this.modal.close();
}

onFilterChange(data:memberParams){
this.memberParams={...data};
this.updatedMemberParams={...data};
this.loadMembers();
}

resetFilter(){
  this.memberParams=new memberParams();
  this.updatedMemberParams=new memberParams();
  this.loadMembers();
}


  get displayMessage():string{
    const defaultParams=new memberParams();
    const filters:string[]=[];
    if(this.updatedMemberParams.gender){
      filters.push(this.updatedMemberParams.gender+'s');
    }
    else{
      filters.push('Males,Females');
    }

    if(this.updatedMemberParams.minAge!==defaultParams.minAge || 
      this.updatedMemberParams.maxAge!==defaultParams.maxAge){
      filters.push(`Ages ${this.updatedMemberParams.minAge.toString()} - ${this.updatedMemberParams.maxAge.toString()}`)
    }
    filters.push(this.updatedMemberParams.orderBy==='lastActive'?"Recently Active":"Newest members");
    return filters.length>0? `Selected: ${filters.join(' | ')}`:'all members';
  }
}
