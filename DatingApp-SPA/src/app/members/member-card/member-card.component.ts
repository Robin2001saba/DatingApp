import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-member-card',
  standalone: true,
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
  imports:[CommonModule, RouterModule],

})
export class MemberCardComponent implements OnInit {
  @Input() user?: User;
  
  constructor(private authService: AuthService,
    private userService: UserService,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertify.success('You have liked: ' + this.user?.knownAs);
    }, error => {
      this.alertify.error(error);
    });
  }

}
