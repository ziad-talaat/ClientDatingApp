import { Component, inject, OnInit, signal } from '@angular/core';
import { AdminService } from '../../../Core/services/admin-service';
import { photo } from '../../../types/photo';
import { ToastService } from '../../../Core/services/toast-service';

@Component({
  selector: 'app-photo-managment',
  imports: [],
  templateUrl: './photo-managment.html',
  styleUrl: './photo-managment.css',
})
export class PhotoManagment implements OnInit {
  private adminService=inject(AdminService);
  private toastService=inject(ToastService);
  protected approavableImages=signal<photo[]>([]);
  
  ngOnInit(): void {
   this.getApproavable();
  }
  getApproavable(){
    this.adminService.getApproavableImages().subscribe({
      next:data=>this.approavableImages.set(data)
    });
  }


  approveImage(id:number,isApproaved:boolean){
    this.adminService.approaveImage(id,isApproaved).subscribe({
      next:()=>{
        this.approavableImages.update(images=>images.filter(x=>x.photoId!=id));
        this.toastService.info(isApproaved?'imaged Approved':'image rejected');
      }
    })
  }

}
