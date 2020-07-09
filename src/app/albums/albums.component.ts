import {Component, OnInit} from '@angular/core';
import {AlbumService} from '../core/album.service';
import {ImageService} from '../core/image.service';
import {UserService} from '../core/user.service';
import {Image} from '../core/image.model';
import {User} from '../core/user.model';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums = [];
  images: Image[];
  user: User;
  layout = 'columns';

  constructor(private albumService: AlbumService, private imageService: ImageService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.albumService.list().subscribe((albums) => {
      this.albums = albums;

      this.albums.forEach(album => {
        forkJoin([album.getImages(), album.getUser()]).subscribe(([images, user]) => {
          album.images = images;
          album.user = user;
        });
      });
    });
  }

  gridColumns(): void {
    this.layout = 'columns';
  }

  gridRows(): void {
    this.layout = 'rows';
  }

}
