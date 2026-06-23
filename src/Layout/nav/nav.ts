import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../Core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../Core/services/toast-service';
import { themes } from '../theme';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav implements OnInit {
  ngOnInit(): void {
    document.documentElement.setAttribute('data-theme',this.selectedTheme());
  }
 
  protected creds:any={};
  protected accountService=inject(AccountService)
  protected router=inject(Router)
  private toastService=inject(ToastService);


  //  handleSelectThem(theme:string){
  //   this.selectedTheme.set(theme);
  //   localStorage.setItem('theme',theme);
  //   document.documentElement.setAttribute('data-theme',theme);
  //   const elem=document.activeElement as HTMLDivElement;
  //    if(elem) 
  //     elem.blur();
  //  }

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
    this.accountService.login(this.creds).subscribe({
      next:()=>{
        this.toastService.success('logged in successfully')
        this.creds={};
        this.router.navigate(['/members']);
      },
      error:error=>{this.toastService.error(error.error.message)},
    })
  }

  logout(){
    this.accountService.logout();
      this.router.navigateByUrl('/');
  }
}
