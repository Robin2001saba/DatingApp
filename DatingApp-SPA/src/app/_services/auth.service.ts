import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  //baseUrl='http://localhost:5011/api/auth/';
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser?: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: HttpClient) { }

  changeMemberPhoto(photoUrl: string){
    this.photoUrl.next(photoUrl);
  }

  login(model: any){
  return this.http.post(this.baseUrl + 'login', model)
    .pipe(
      map((response:any)=>{
        const user=response;
        if(user){
          localStorage.setItem('token',user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.currentUser=user.user;
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
          console.log(this.decodedToken);
          this.changeMemberPhoto(this.currentUser?.photoUrl ?? '../../assets/user.png');
        }
      })
    );
  }

  register(user: User){
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn(){
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
