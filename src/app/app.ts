import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { Nav } from "../Layout/nav/nav";
import { Home } from "../Features/home/home";
import { user } from '../types/user';

@Component({
  selector: 'app-root',
  imports: [Nav, Home, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected router=inject(Router);
  

  
}
