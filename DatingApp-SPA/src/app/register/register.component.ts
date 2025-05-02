import { NgForOf, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Make sure FormsModule is imported here
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports:[FormsModule, NgIf, NgForOf]
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();

  model: any={};

  constructor(private authService: AuthService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  register(){
    this.authService.register(this.model).subscribe({
      next: () => {
        this.alertify.success('Registration successful');
      },
      error: (err: any) => {
        this.alertify.error(err);
      }
    });
  }

  cancel(){
    this.cancelRegister.emit(false);
    console.log("Cancelled");
  }
}
