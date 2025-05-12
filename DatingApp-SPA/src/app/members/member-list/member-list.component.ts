import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from "../member-card/member-card.component";
import { ActivatedRoute } from '@angular/router';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PaginatedResult, Pagination } from '../../_models/Pagination';
import { FormsModule, NgModel } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonsModule, MemberCardComponent, PaginationModule], // ✅ Add this line

  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  users: User[] = [];
  user: User = JSON.parse(localStorage.getItem('user') || '{}');
  genderList: { value: string, display: string}[] = [{value:'male', display: 'Males'}, {value:'female',display:'Females'}];
  userParams: any = {};
  pagination!: Pagination;

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) {}

ngOnInit() {
    this.route.data.subscribe(data => {
      const paged = data['users'] as PaginatedResult<User[]>;
      this.users      = paged.result || [];      // the array of User
      this.pagination = paged.pagination || { totalItems: 0, itemsPerPage: 0, currentPage: 0, totalPages: 0 };  
      
    });
    this.userParams.gender = this.user.gender === 'female'? 'male': 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }
  resetFilters() {
    this.userParams.gender = this.user.gender === 'female'? 'male': 'female';
    this.userParams.minAge = 18;
    this.userParams.maxAge = 99;
    this.loadUsers();
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
    console.log(this.pagination.currentPage);
  }

  loadUsers(){
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
      .subscribe((res: PaginatedResult< User[]>)=>{
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }
}
