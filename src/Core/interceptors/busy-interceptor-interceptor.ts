import { HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';

export const busyInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
    const busService=inject(BusyService);
   let spinnerShown = false;

     const timer = setTimeout(() => {
        spinnerShown=true;
    busService.busy();
  }, 200); 

    
    return next(req).pipe(
       finalize(()=>{
           clearTimeout(timer);

           if(spinnerShown){
               busService.idle();
            }

       }
       ));


};
