import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { catchError, EMPTY, map, Observable } from "rxjs";
import { PaginatedResult } from "../_models/Pagination";

@Injectable({ providedIn: 'root' })
export class ListsResolver implements Resolve<PaginatedResult<User[]>> {
  pageNumber = 1;
  pageSize = 5;
  likesParam = 'Likers';
  constructor(
    private userService: UserService,
    private router: Router,
    private alertify: AlertifyService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<PaginatedResult<User[]>> {
    return this.userService
      .getUsers(this.pageNumber, this.pageSize, null, this.likesParam)
      .pipe(
        catchError(error => {
          this.alertify.error('Problem retrieving data');
          this.router.navigate(['/home']);
          return EMPTY;
        })
      );
  }
}