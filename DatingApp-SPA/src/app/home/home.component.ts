import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from "../register/register.component";
import { NgIf } from '@angular/common';
import { MemberListComponent } from '../members/member-list/member-list.component';
import { MemberCardComponent } from '../members/member-card/member-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [RegisterComponent, NgIf]
})

export class HomeComponent implements OnInit {
  registerMode = false;
  public values: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues();
  }

  registerToggle(){
    this.registerMode= true;
  }

  getValues() {
    this.http.get('http://localhost:5011/api/values').subscribe({
      next: response => this.values = response,
      error: err => console.error(err)
    });
  }

  cancelRegisterMode(registerMode: boolean){
    this.registerMode = registerMode;
  }
}
