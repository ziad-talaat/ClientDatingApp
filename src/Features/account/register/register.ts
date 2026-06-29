import { Component, inject, OnInit, output, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { RegisterCreds } from '../../../types/user';
import { AccountService } from '../../../Core/services/account-service';
import { TextInput } from "../../../Shared/text-input/text-input";
import { minLength, validate } from '@angular/forms/signals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, TextInput],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  cancelRegister = output<boolean>();
  protected creds = {} as RegisterCreds;
  private accountService = inject(AccountService);
  private  formGroup=inject(FormBuilder);
  protected registerForm: FormGroup = new FormGroup({});
  protected profileForm: FormGroup = new FormGroup({});
  protected currentStep=signal<number>(1);
  private router=inject(Router);
  protected validationErrors=signal<string[]>([]);

  constructor(){
  this.registerForm = this.formGroup.group({
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z]+$/),]],
        password: ['', [
          Validators.required,
         
          Validators.minLength(5),
          Validators.maxLength(20),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).*$/),
        ]],
        confirmPassword: ['',
           Validators.required,
        ],
      
     
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern(/^01[0125]\d{8}$/)
      ]],
    },{
      validators:this.confirmPasswordValidator('password','confirmPassword')
    });

     this.profileForm = this.formGroup.group({
      gender:['male',[Validators.required]],
      dateOfBirth:['',[Validators.required]],
      city:['',[Validators.required,Validators.minLength(2)]],
      country:['',[Validators.required,Validators.minLength(2)]],
    });
  }
  
  getMaxDate(){
    const today=new Date();
     today.setFullYear(today.getFullYear()-18);
     return today.toISOString().split('T')[0];
  }


  confirmPasswordValidator(firtConstroleName:string,secondControlName:string):ValidatorFn {

      return (control: AbstractControl): ValidationErrors | null=>{

  const password = control.get(firtConstroleName);
  const confirmPassword = control.get(secondControlName);

  if (!password || !confirmPassword) {
    return null;
  }

  if( password.value === confirmPassword.value)
    return null
  else{
    confirmPassword.setErrors({ passwordMismatch: true })
    return  { passwordMismatch: true };

      }
  
}
}


register(){
  const formGroup={...this.registerForm.value,...this.profileForm.value};
    if (this.registerForm.invalid || this.profileForm.invalid) {
    this.registerForm.markAllAsTouched();
    this.profileForm.markAllAsTouched();
    return;
  }

    this.accountService.register(formGroup).subscribe({
      next:()=>{
         this.router.navigateByUrl('/members');
      },
      error:error=>{
        console.log(error);
        this.validationErrors.set(error);
      }
    })

}

    prevStep(){
 this.currentStep.update(x=>x-1);
    }
    nextStep(){
 this.currentStep.update(x=>x+1);

    }


  cancel() {
    this.cancelRegister.emit(false);
  }
}
