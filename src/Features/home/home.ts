import { Component, inject, Input, signal } from '@angular/core';
import { Register } from "../account/register/register";
import { required } from '@angular/forms/signals';
import { user } from '../../types/user';
import { AccountService } from '../../Core/services/account-service';

@Component({
  selector: 'app-home',
  imports: [Register],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
protected registerMode=signal(false);
protected accountService=inject(AccountService);

showRegister(value:boolean){
  this.registerMode.set(value);
}

}
