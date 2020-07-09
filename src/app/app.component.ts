import { Component } from '@angular/core';
import {AuthService} from './auth/auth.service';
import {Router, UrlTree} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dib-gallery';

  constructor(public authService: AuthService, public router: Router) {}

  logout(): Promise<unknown> {
    this.authService.logout();

    // Redirect to the login page
    return this.router.navigate(['/login']);
  }
}
