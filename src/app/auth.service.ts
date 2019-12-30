import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, config } from 'rxjs';
import { Movie } from './movie';
import { tap, catchError } from 'rxjs/operators';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private BaseAuthUrl = 'http://127.0.0.1:8000/auth/token/';
    private loginUrl = this.BaseAuthUrl + "login";
    private logoutUrl = this.BaseAuthUrl + "logout";

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    };
  

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user: User) {
        return this.http.post<any>(this.loginUrl, user)
            .pipe(map(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        this.http.post<any>(this.loginUrl, {}, );
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}

// @Injectable({ providedIn: 'root' })
// export class AlertService {
//     private subject = new Subject<any>();
//     private keepAfterRouteChange = false;

//     constructor(private router: Router) {
//         // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
//         this.router.events.subscribe(event => {
//             if (event instanceof NavigationStart) {
//                 if (this.keepAfterRouteChange) {
//                     // only keep for a single route change
//                     this.keepAfterRouteChange = false;
//                 } else {
//                     // clear alert message
//                     this.clear();
//                 }
//             }
//         });
//     }

//     getAlert(): Observable<any> {
//         return this.subject.asObservable();
//     }

//     success(message: string, keepAfterRouteChange = false) {
//         this.keepAfterRouteChange = keepAfterRouteChange;
//         this.subject.next({ type: 'success', text: message });
//     }

//     error(message: string, keepAfterRouteChange = false) {
//         this.keepAfterRouteChange = keepAfterRouteChange;
//         this.subject.next({ type: 'error', text: message });
//     }

//     clear() {
//         // clear by calling subject.next() without parameters
//         this.subject.next();
//     }
// }