import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account-service';
import { inject } from '@angular/core';
import { ToastService } from '../services/toast-service';

export const adminGuard: CanActivateFn = (route, state) => {
  const accountService=inject(AccountService);
  const toastService=inject(ToastService);
  const roles=accountService.currentUser()?.role;

  if(roles && ( roles.includes('Admin') || roles.includes('Moderator') )){
    return true;
  }
else{
  toastService.error('Enter this ara ,you cannot')
  return false;
}
};
