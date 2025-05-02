import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Make sure FormsModule is imported here
import { AuthService } from '../_services/auth.service';
import { TitleCasePipe,NgIf } from '@angular/common'; // ✅ Import NgIf
import { AlertifyService } from '../_services/alertify.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  imports: [FormsModule,TitleCasePipe,NgIf,BsDropdownModule],  // Include FormsModule here for handling forms
})

export class NavComponent implements OnInit {
  model: any = {};
  errorMessage: string ='';

  constructor(public authService: AuthService,
    private cdRef: ChangeDetectorRef,
    private alertify: AlertifyService
  ) {}

  ngOnInit() {}
  login() {
    this.authService.login(this.model).subscribe({
      next: () => {
        this.errorMessage = '';
        this.alertify.success('Logging in successfully');
      },
      error: (err: any) => {
        this.errorMessage = err.message;
        this.alertify.error(err); // ✅ now it's the message you created in the interceptor
      }
    });
  }
  
  loggedIn(): boolean {
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedIn();
  }
  
  logout(){
    localStorage.removeItem('token');
    this.cdRef.detectChanges();
    this.alertify.message('Logged out');
  }
}
