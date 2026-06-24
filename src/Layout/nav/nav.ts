import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../Core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../Core/services/toast-service';
import { themes } from '../theme';
import { finalize } from 'rxjs';
import { busyInterceptorInterceptor } from '../../Core/interceptors/busy-interceptor-interceptor';
import { BusyService } from '../../Core/services/busy-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive,ReactiveFormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
   protected loginForm!: FormGroup ;
   private fb=inject(FormBuilder);
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
      error:error=>{
       console.log(error.error);
       
        },
    })
  }

  logout(){
    this.accountService.logout();
      this.router.navigateByUrl('/');
  }
}
