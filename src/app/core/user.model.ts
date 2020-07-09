import {Injectable} from '@angular/core';
import {Adapter} from './adapter';

export class User {
  constructor(
    public id: number,
    public name: string,
    public username: string,
    public email: string,
  ) {}
}

@Injectable({
  providedIn: 'root',
})

// @ts-ignore
export class UserAdapter implements Adapter<User> {
  adapt(item: any): User {
    return new User(item.id, item.name, item.username, item.email);
  }
}
