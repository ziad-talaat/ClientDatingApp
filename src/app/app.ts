import { Component, inject} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { Nav } from "../Layout/nav/nav";
import { ConfirmDoalog } from "../Shared/confirm-doalog/confirm-doalog";

@Component({
  selector: 'app-root',
  imports: [Nav, RouterOutlet, ConfirmDoalog],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected router=inject(Router);
  

  
}
