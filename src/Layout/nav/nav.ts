import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../Core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../Core/services/toast-service';
import { themes } from '../theme';
import { finalize } from 'rxjs';
import { BusyService } from '../../Core/services/busy-service';
import { HasRole } from '../../Shared/directives/has-role';
import { PresenceService } from '../../Core/services/presence-service';
import { TimeAgoPipe } from "../../Core/pipes/time-ago-pipe";

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive, ReactiveFormsModule, HasRole, TimeAgoPipe],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
   protected loginForm!: FormGroup ;
   private fb=inject(FormBuilder);
   protected presence=inject(PresenceService);
   displayUnReadMessgaes:boolean=false;
  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme',this.selectedTheme());


    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
        ]
      ]
    });

  }
 
  protected creds:any={};
  protected accountService=inject(AccountService)
  protected router=inject(Router)
  private toastService=inject(ToastService);
  protected isInProgress=signal<boolean>(false);
  protected busyService=inject(BusyService);

 

   get getThemes(){
    return themes
   }

    
  protected selectedTheme=signal<string>(localStorage.getItem('theme')||'light');
  handleSelectThem(theme:string){
    localStorage.setItem('theme',theme);
    this.selectedTheme.set(theme);
      document.documentElement.setAttribute('data-theme',theme);
   const element= document.activeElement as HTMLDivElement;
   if(element)
    element.blur();
  }



  goToProfile(){
     let element= document.activeElement as HTMLElement;
   if(element)
    element.blur();
  
    this.router.navigateByUrl('/members/'+this.accountService.currentUser()?.id);
  }


  login(){
    if(this.loginForm.invalid)return;
     this.isInProgress.set(true);  

    this.accountService.login(this.loginForm.value).pipe(finalize(()=>this.isInProgress.set(false)))
    .subscribe({
      next:()=>{
        this.toastService.success('logged in successfully')
        this.loginForm.reset();
        this.router.navigate(['/members']);
      },
      error:error=>this.toastService.error(error.error?.message??"invaid Data")
    })
  }
  onMouseOver(){
    this.displayUnReadMessgaes=true;
  }
  onMouseLeave(){
    this.displayUnReadMessgaes=false;
  }

navigateToChat(id:string){
  if(!id)return;
  this.router.navigateByUrl(`/members/${id}/Messages`);
}




  logout(){
    this.accountService.logout();
      this.router.navigateByUrl('/');
  }
}
