import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {

  logoFooter = '../../../assets/img/logo-empire.png';
  private authListenerSubs: Subscription;
  userIsAuthenticated = false;
  constructor(private auth: AuthenticationService, private router: Router) { }



  ngOnInit() {
    this.userIsAuthenticated = this.auth.getIsAuth();
    this.authListenerSubs = this.auth
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated;
  });
  }
  onLogout() {
    this.auth.logout();
  }
  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
