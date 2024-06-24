import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/_interfaces/auth';
import { AuthService } from './../../../auth/services/auth.service';
@Component({
  selector: 'app-home-nav-bar',
  templateUrl: './home-nav-bar.component.html',
  styleUrls: ['./home-nav-bar.component.css']
})
export class HomeNavBarComponent implements OnInit {
  constructor(private AuthService: AuthService) { }
  auth: Auth | null = null;
  role: string = '';
  ngOnInit(): void {
    this.auth = this.AuthService.getCurrentAuth();
    this.getRole();
  }

  getRole() {
    this.role = this.AuthService.getRole();
  }
}
