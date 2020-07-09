import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
      tap(() => {
        localStorage.setItem('loggedIn', 'true');
      })
    );
  }

  logout(): void {
    localStorage.setItem('loggedIn', 'false');
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('loggedIn') === 'true';
  }
}
