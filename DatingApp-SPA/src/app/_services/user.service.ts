import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { User } from '../_models/user';
import { Photo } from '../_models/photo';
import { PaginatedResult } from '../_models/Pagination';
import { Message } from '../_models/Message';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Bearer ' + localStorage.getItem('token')
//   })
// };

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl =  environment.apiUrl;

  constructor(private http: HttpClient) {}

  // getUsers(): Observable<User[]>{
  //   return this.http.get<User[]>(this.baseUrl + 'users');
  // }

  getUsers(page?: number, itemsPerPage?: number, userParams?: any, likesParams?: any): Observable<PaginatedResult<User[]>>{
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    let params = new HttpParams();
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if(userParams !=null){
      params = params.append('minAge', userParams.minAge);
      params = params.append('maxAge', userParams.maxAge);
      params = params.append('gender', userParams.gender);
      params = params.append('orderBy', userParams.orderBy);
    }

    if(likesParams === 'Likers'){
      params = params.append('likers', 'true');
    }

    if(likesParams === 'Likees'){
      params = params.append('likees', 'true');
    }

    return this.http.get<User[]>(this.baseUrl + 'users', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body ?? [];
          if(response.headers.get('Pagination') != null){
            const paginationHeader = response.headers.get('Pagination');
            if (paginationHeader) {
              paginatedResult.pagination = JSON.parse(paginationHeader);
            }
          }
          return paginatedResult;
          })
      );
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  updateUser(id: number, user:User){
    return this.http.put(this.baseUrl + 'users/' + id, user);
  }

  setMainPhoto(userId: number, id: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/photos/' + id + '/setMain', {});
  }

  deletePhoto(userId: number, id: number){
    return this.http.delete(this.baseUrl + 'users/' + userId + '/photos/' + id);
  }

  sendLike(id: number, recipientId: number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/like/' + recipientId, {});
  }

  getMessages(id: number, page?: number, itemsPerPage?: number, messageContainer?: any)
  {
    const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();
    let params = new HttpParams();
    params = params.append('MessageContainer', messageContainer);
    if(page != null && itemsPerPage != null){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages', {observe: 'response', params})
      .pipe(
        map(response => {
          paginatedResult.result = response.body ?? [];
          if(response.headers.get('Pagination') != null){
            const paginationHeader = response.headers.get('Pagination');
            if (paginationHeader) {
              paginatedResult.pagination = JSON.parse(paginationHeader);
            }
          }
          return paginatedResult;
          })
      );
  }

  getMessageThread(id: number, recipientId: number) {
    return this.http.get<Message[]>(this.baseUrl + 'users/' + id + '/messages/thread/' + recipientId);
  }

  sendMessage(id: number, message: Message) {
    return this.http.post<Message>(this.baseUrl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + id, {});
  }

  markAsRead(userId: number, messageId: number) {
    return this.http.post(this.baseUrl + 'users/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }
}
