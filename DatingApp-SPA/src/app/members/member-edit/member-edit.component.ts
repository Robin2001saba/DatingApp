import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FormsModule, NgForm } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
  imports:[FormsModule, TabsModule, NgxGalleryModule,NgIf]
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm',{static: true}) editForm?: NgForm

  user!: User;
  
  @HostListener('window:beforeunload',['$event'])
  unloadNotification($event: any){
    if(this.editForm?.dirty){
      $event.returnValue = true;
    }
  }
  
  constructor(private route: ActivatedRoute,
    private alertify: AlertifyService,
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user =data['user'];
    })
  }

  updateUser(){
    console.log(this.user);
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
    this.editForm?.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
    
  }

}
