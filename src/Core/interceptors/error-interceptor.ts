import { HttpInterceptorFn } from '@angular/common/http';
import { catchError } from 'rxjs';
import { ToastService } from '../services/toast-service';
import { inject } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AccountService } from '../services/account-service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);
  const router = inject(Router);
  const accountService = inject(AccountService);

  return next(req).pipe(
    catchError((error) => {
      if (error) {
        switch (error.status) {
          case 400:
            if(error.error.errors){
              const modelErrors=[];
              for(const key in error.error.errors){
                   if(error.error.errors[key]){
                    modelErrors.push(error.error.errors[key]);
                   }
                  }
                  throw modelErrors.flat();

             }
             else{
              toast.error(error.error);
            }
          
            break;
          case 401:
            
           console.log(error);
               if(error.error?.title)
                toast.error(error.error.title);
              else 
                toast.error(error.error);
              
              accountService.logout();
              break;
            

          case 404:
            router.navigateByUrl('/not-found');
            break;
          case 500:
            const navigationExtras:NavigationExtras={state:error.error};
            router.navigateByUrl('/server-error',navigationExtras);
            break;
          default:
            toast.error('somthing went wrong');
            break;
        }
      }
      throw error;
    }),
  );
};
