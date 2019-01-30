import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
    // observable array
    // the header component is subscribing to the 
    // auth change array
    authChange = new Subject<boolean>();
    private user: User;

    constructor(private router: Router) {}

    register(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        };
        this.authChange.next(true);
        this.succcesfullLogin();
    }

    login(authData: AuthData) {
        this.user = {
            email: authData.email,
            userId: Math.round(Math.random() * 1000).toString()
        }
        this.authChange.next(true);
        this.succcesfullLogin();
    }

    logout() {
        this.user = null;
        this.authChange.next(false);
        this.router.navigate(['/login']);
    }

    getUser() {
        // this is so other parts of app can't change user 
        // spread operator?
        return { ...this.user }
    }

    isAuth() {
        return this.user != null;
    }

    private succcesfullLogin() {
        this.router.navigate(['/training']);
    }
}