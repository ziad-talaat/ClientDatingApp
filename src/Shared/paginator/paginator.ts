import { Component, computed, input, model, output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  imports: [],
  templateUrl: './paginator.html',
  styleUrl: './paginator.css',
})
export class Paginator {
  pageNumber=model(1);
  pageSize=model(10);
  
  totalItems=input(0);

  totalPage=computed(()=>{
    return Math.ceil(this.totalItems()/this.pageSize())
  });

  pageChange=output<{pageNumber:number,pageSize:number}>();
  pageSizeOptins=input([5,10,15,20,30,40]);
   
  lastItemIndex=computed(()=>{
    return Math.min(this.pageNumber()*this.pageSize(),this.totalItems())
  })

  onPageChange(pageNumber?:number,event?:EventTarget|null){
   if(pageNumber)this.pageNumber.set(pageNumber);
   if(event){
       const pageSize=Number((event as HTMLSelectElement).value);
     this.pageSize.set(pageSize);
   }
    

   this.pageChange.emit({
    pageNumber:this.pageNumber(),
    pageSize:this.pageSize()
   });
  }

  
}
