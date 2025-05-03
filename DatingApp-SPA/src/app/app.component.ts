import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavComponent } from'./nav/nav.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  standalone: true,  // Make sure this is set correctly for standalone component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NavComponent, HomeComponent] // Include ValueComponent here if using standalone component
  // Include ValueComponent here if using standalone component
})

export class AppComponent implements OnInit{
  title = 'DatingApp-SPA';
  jwtHelper = new JwtHelperService();
  
  constructor(private authService: AuthService){}

  ngOnInit(){
    const token =localStorage.getItem('token');
    if (token){
      this.authService.decodedToken=this.jwtHelper.decodeToken(token);
    }
  }
}
