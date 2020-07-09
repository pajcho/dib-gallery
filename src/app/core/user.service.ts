import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, UserAdapter} from './user.model';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})

// @ts-ignore
export class UserService {
  private baseUrl = 'https://jsonplaceholder.typicode.com/users/';

  constructor(private http: HttpClient, private adapter: UserAdapter) {
  }

  get(userId: number): Observable<User> {
    const url = `${this.baseUrl}/`;
    return this.http.get(url + userId).pipe(
      // Adapt each item in the raw data array
      map(data => this.adapter.adapt(data))
    );
  }
}
