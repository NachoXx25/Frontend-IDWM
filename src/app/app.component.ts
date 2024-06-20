import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { Auth } from './_interfaces/auth';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontendIDWM';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    initFlowbite();
    this.setCurrentAuth();
  }

  setCurrentAuth() {
    const authString = localStorage.getItem('auth');
    if (!authString) return;
    const auth: Auth = JSON.parse(authString);
    this.authService.setCurrentAuth(auth);
  }
}


