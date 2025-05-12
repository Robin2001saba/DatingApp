import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from '../../_models/user';
import { ActivatedRoute } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AlertifyService } from '../../_services/alertify.service';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { PhotoEditorComponent } from '../photo-editor/photo-editor.component';
import { TimeagoModule } from 'ngx-timeago';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
  imports:[CommonModule, FormsModule, TabsModule, NgxGalleryModule, TimeagoModule, NgIf, PhotoEditorComponent]
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm',{static: true}) editForm?: NgForm

  user!: User;
  photoUrl?: string;
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
      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
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

  // updateMainPhoto(photoUrl: string){
  //   this.user.photoUrl = photoUrl;
  // }
  updateMainPhoto(photoUrl: string) {
    this.user.photoUrl = photoUrl;
  }
  

}
