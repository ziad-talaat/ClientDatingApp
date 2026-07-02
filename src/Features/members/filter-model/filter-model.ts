import { Component, ElementRef, model, output, ViewChild } from '@angular/core';
import { memberParams } from '../../../types/MemberParams';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-filter-model',
  imports: [FormsModule],
  templateUrl: './filter-model.html',
  styleUrl: './filter-model.css',
})
export class FilterModel {

  @ViewChild('filterModal') modelRef!:ElementRef<HTMLDialogElement>;
  closeModel=output();
  submitData=output<memberParams>();
   memberParams=model(new memberParams());

    constructor(){
     const reservedFilters= localStorage.getItem('filters');
     if(reservedFilters){
        this.memberParams.set( JSON.parse(reservedFilters));
       }
    }


  open(){
    this.modelRef.nativeElement.showModal()
  }

  close(){
    this.modelRef.nativeElement.close();
    this.closeModel.emit();
  }

  submit(){
    this.submitData.emit(this.memberParams());
    this.close();
  }

   onMinAgeChange(){
    if(this.memberParams().minAge < 18)
      this.memberParams().minAge=18;
  }
      
onMaxAgeChange(){
   if(this.memberParams().maxAge<this.memberParams().minAge)
    this.memberParams().maxAge=this.memberParams().minAge;
  }


}
