import { Component, OnInit } from '@angular/core';
import { Message } from '../_models/Message';
import { PaginatedResult, Pagination } from '../_models/Pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AlertifyService } from '../_services/alertify.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NgFor, NgIf } from '@angular/common';
import { TimeagoModule } from 'ngx-timeago';
import { FormsModule, NgModel } from '@angular/forms';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
  imports: [PaginationModule, NgFor, TimeagoModule, FormsModule, RouterModule, ButtonsModule, NgIf],
})
export class MessagesComponent implements OnInit {
  messages: Message[]=[];
  pagination!: Pagination;
  messageContainer = 'Unread';

  constructor(private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      const paged = data['messages'] as PaginatedResult<Message[]>;
      this.messages      = paged.result || [];      // the array of User
      this.pagination = paged.pagination || { totalItems: 0, itemsPerPage: 0, currentPage: 0, totalPages: 0 };  
      
    });
  }

  loadMessages(){
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer)
      .subscribe((res: PaginatedResult< Message[]>)=>{
      this.messages = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
    console.log(this.pagination.currentPage);
  }

  deleteMessage(id: number) {
    this.alertify.confirm('Are you sure you want to delete this message?', () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
        this.alertify.success('Message has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the message');
      });
    });
  }
  
}
