import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-lists',
  standalone: true,
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  imports: [MemberCardComponent, ButtonsModule, PaginationModule, FormsModule, NgFor],
})
export class ListsComponent implements OnInit {
  users: User[] = [];
  pagination!: Pagination;
  likesParam!: string;
  constructor(private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.likesParam = 'Likers';
    this.route.data.subscribe(data => {
          const paged = data['users'] as PaginatedResult<User[]>;
          this.users      = paged.result || [];      // the array of User
          this.pagination = paged.pagination || { totalItems: 0, itemsPerPage: 0, currentPage: 0, totalPages: 0 };  
          
  });
 
  }

  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam)
      .subscribe((res: PaginatedResult< User[]>)=>{
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  
  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    console.log(this.pagination.currentPage);
  }
}
