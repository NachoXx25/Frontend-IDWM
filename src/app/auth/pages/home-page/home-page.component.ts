import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit{
  role: string = '';
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getRolee();
  }


  getRolee()  {
    this.role = this.authService.getRole();
  }

}
