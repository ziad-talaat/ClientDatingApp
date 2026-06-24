import { HttpInterceptorFn } from '@angular/common/http';
import { BusyService } from '../services/busy-service';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';

export const busyInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  
    const busService=inject(BusyService);
    
    busService.busy(); 
    return next(req).pipe(
       finalize(()=>busService.idle())
       );


};
