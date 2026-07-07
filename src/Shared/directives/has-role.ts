import { Directive, inject, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AccountService } from '../../Core/services/account-service';

@Directive({
  selector: '[appHasRole]',
})
export class HasRole implements OnInit {
  private accountServce=inject(AccountService);
  private viewContainerRef=inject(ViewContainerRef);
  private templateRef=inject(TemplateRef);
  
  @Input() appHasRole:string[]=[];
  
  ngOnInit(): void {
    if(this.accountServce.currentUser()?.role.some(r=>this.appHasRole.includes(r))){
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    }else{
      this.viewContainerRef.clear();
    }
  }
}
