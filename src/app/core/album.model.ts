import {Injectable} from '@angular/core';
import {Adapter} from './adapter';
import {ImageService} from './image.service';
import {Observable} from 'rxjs';
import {Image} from './image.model';
import {UserService} from './user.service';
import {User} from './user.model';

export class Album {
  images: Image[];
  user: User;

  constructor(
    public id: number,
    public title: string,
    public userId: number,
    private imageService: ImageService,
    private userService: UserService,
  ) {
  }

  getImages(): Observable<Image[]> {
    return this.imageService.getByAlbum(this.id);
  }

  getUser(): Observable<User> {
    return this.userService.get(this.userId);
  }
}

@Injectable({
  providedIn: 'root',
})

// @ts-ignore
export class AlbumAdapter implements Adapter<Album> {
  constructor(private imageService: ImageService, private userService: UserService) {
  }

  adapt(item: any): Album {
    return new Album(item.id, item.title, item.userId, this.imageService, this.userService);
  }
}
