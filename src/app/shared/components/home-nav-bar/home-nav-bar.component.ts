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
  public auth: Auth | null = null;

  ngOnInit(): void {
    this.auth = this.AuthService.getCurrentAuth();
  }
}
