import { Injectable } from '@angular/core';
import { User } from './user.model';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training.service';
import { MatSnackBar } from '@angular/material';
import { UiService } from '../shared/ui-service';

@Injectable()
export class AuthService {
    // observable array
    // the header component is subscribing to the 
    // auth change array
    authChange = new Subject<boolean>();
    private isAuthenticated = false;

    constructor(private router: Router,
                private afAuth: AngularFireAuth, 
                private trainingservice:TrainingService,
                private snackbar: MatSnackBar,
                private uiservice: UiService) {}

    initAuthListener() {
        this.afAuth.authState.subscribe(user => {
            if(user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            } else {
                this.trainingservice.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    register(authData: AuthData) {
        this.uiservice.loadingStateChange.next(true);
        this.afAuth.auth.createUserWithEmailAndPassword(
            authData.email,
            authData.password)
            .then(result => {
                this.uiservice.loadingStateChange.next(false);
            })
            .catch(err => {
                this.uiservice.loadingStateChange.next(false);
                this.snackbar.open(err.message, null, {
                    duration: 3000
                });
            });
        this.authChange.next(true);
        
    }

    login(authData: AuthData) {
        this.uiservice.loadingStateChange.next(true);
        this.afAuth.auth.signInWithEmailAndPassword(
            authData.email, 
            authData.password)
                .then(result => {
                    this.uiservice.loadingStateChange.next(false);
                })
                .catch(err => {
                    this.uiservice.loadingStateChange.next(false);
                    this.snackbar.open(err.message, null, {
                        duration: 3000
                    });
                });
        this.authChange.next(true);
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    isAuth() {
        return this.isAuthenticated;
    }
}