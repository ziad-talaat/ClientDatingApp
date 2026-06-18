import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../Core/services/account-service';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../Core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  protected creds:any={};
  protected accountService=inject(AccountService)
  protected router=inject(Router)
private toastService=inject(ToastService);

  login(){
    this.accountService.login(this.creds).subscribe({
      next:result=>{
        this.toastService.success('logged in successfully')
        this.creds={};
        this.router.navigate(['/members']);
      },
      error:error=>{console.log(error); this.toastService.error(error.error.errors[Object.keys(error.error.errors)[0]][0])},
    })
  }

  logout(){
    this.accountService.logout();
      this.router.navigateByUrl('/');
  }
}
