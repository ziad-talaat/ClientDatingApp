import { Injectable, signal } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class BusyService {
   
  busyCount=signal<number>(0);

  busy(){
    this.busyCount.update(cur=>cur+1);
  }
   
  idle(){
    this.busyCount.update(cur=>Math.max(0,this.busyCount()-1));
  }

}
