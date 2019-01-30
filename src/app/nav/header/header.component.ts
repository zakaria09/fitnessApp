import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs/Subscription'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  // event emitter
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription;

  constructor(private authservice: AuthService) { }

  ngOnInit() {
    // subscribing to the authChange array from service
    this.authSubscription = this.authservice.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  // destroying subbscription to prevent memory leak
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  onLogout() {
    this.authservice.logout();
  }
}
