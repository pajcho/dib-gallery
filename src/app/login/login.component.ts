import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  message: string;

  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }

  setMessage(): void {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login(): void {
    this.message = 'Trying to log in ...';

    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Usually you would use the redirect URL from the auth service.
        // However to keep the example simple, we will always redirect to `/admin`.
        const redirectUrl = '/albums';

        // Redirect the user
        this.router.navigate([redirectUrl]);
      }
    });
  }
}
