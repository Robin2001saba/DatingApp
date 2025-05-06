import { Injectable } from "@angular/core";
import { User } from "../_models/user";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { catchError, EMPTY, Observable, of } from "rxjs";

@Injectable({
    providedIn:'root'
})
export class MemberListResolver implements Resolve<User[]>{
    constructor(private userService: UserService, 
        private router:Router, 
        private alertify:AlertifyService) {}

    resolve(): Observable<User[]>{
        return this.userService.getUsers().pipe(
            catchError(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/home']);
                return EMPTY;
            })
        )
    }
}