import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Photo } from '../../_models/photo';
import { CommonModule, NgClass, NgFor, NgIf, NgStyle } from '@angular/common';
import { FileDropDirective, FileUploader, FileUploadModule } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';


@Component({
  selector: 'app-photo-editor',
  standalone: true,
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css'],
  imports:[CommonModule, NgFor, NgStyle, NgIf, NgClass, FileUploadModule ]
})
export class PhotoEditorComponent implements OnInit {

  @Input() photos?: Photo[];
  //@Output() getMemberPhotoChange = new EventEmitter<string>();
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  uploader!: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;
  currentMain?: Photo;

  constructor(private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.initializeUploader();
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer '+ localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false; };

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos?.push(photo);
        if(photo.isMain){
          
          this.authService.changeMemberPhoto(photo.url);
          this.authService.currentUser!.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        }
        console.log('File successfully uploaded');
      }
    };
  }

  setMainPhoto(photo: Photo){
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(()=> {
      this.currentMain = this.photos?.filter(p=> p.isMain === true)[0];
      
      this.currentMain!.isMain = false;
      photo.isMain = true;
      //this.photoChange.emit(photo.url);
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser!.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      this.alertify.success('Successfully set to main photo');
    
    }, error => {
      this.alertify.error(error);
  });
  }

  deletePhoto(id: number){
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos?.splice(this.photos.findIndex(p => p.id === id) ,1);
        this.alertify.success('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }
}
