import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn = false;
  constructor(private userService: UserService, private router: Router) {
    this.userService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }
  title = 'demo-angular';

  onLogout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
