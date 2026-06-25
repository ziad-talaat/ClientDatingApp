import { Component, inject, input, output, signal } from '@angular/core';
import { MemberService } from '../../Core/services/member-service';

@Component({
  selector: 'app-image-upload',
  imports: [],
  templateUrl: './image-upload.html',
  styleUrl: './image-upload.css',
})
export class ImageUpload {

  protected imageSrc=signal<string| ArrayBuffer|null|undefined>(null);
  protected isDraging=signal(false);
  private fileToUpload:File|null=null;
  
  uploadFile=output<File>();
  loading=input<boolean>(false);


  onDragEvent(event:DragEvent){
   event.preventDefault();
   event.stopPropagation();
   this.isDraging.set(true);
  }
  
   onDragLeave(event:DragEvent){
   event.preventDefault();
   event.stopPropagation();
   this.isDraging.set(false);
  }
onDrop(event:DragEvent){
   event.preventDefault();
   event.stopPropagation();
   this.isDraging.set(false);

   if(event.dataTransfer?.files.length){
    const file=event.dataTransfer.files[0];
     this.previewImage(file);
    this.fileToUpload=file;
   }
  }

   private previewImage(file:File){
    const reader=new FileReader();
    reader.onload=(e)=>this.imageSrc.set(e.target?.result);
    reader.readAsDataURL(file);
   }



   onCancel(){
    this.imageSrc.set(null);
    this.fileToUpload=null;
   }

   onUpload(){
    if(this.fileToUpload){
      this.uploadFile.emit(this.fileToUpload);
    }
   }
}
