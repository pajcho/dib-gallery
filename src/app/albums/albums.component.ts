import {Component, OnInit} from '@angular/core';
import {AlbumService} from '../core/album.service';
import {ImageService} from '../core/image.service';
import {UserService} from '../core/user.service';
import {Observable} from 'rxjs';
import {ActionsSubject, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {AlbumAction, AlbumActionTypes, LoadAlbums} from '../actions/album.actions';
import {ofType} from '@ngrx/effects';
import {Album} from '../core/album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums = [];
  layout = 'columns';

  constructor(private albumService: AlbumService, private imageService: ImageService,
              private userService: UserService, private store: Store<AppState>, private actionsSubject: ActionsSubject) {

    this.actionsSubject.pipe(
      ofType(AlbumActionTypes.LoadAlbumsSuccess)
    ).subscribe((data: AlbumAction) => {
      console.log(data);
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadAlbums());

    // this.albumService.list().subscribe((albums) => {
    //   this.albums = albums;
    //
    //   this.albums.forEach(album => {
    //     forkJoin([album.getImages(), album.getUser()]).subscribe(([images, user]) => {
    //       album.images = images;
    //       album.user = user;
    //     });
    //   });
    // });
  }

  gridColumns(): void {
    this.layout = 'columns';
  }

  gridRows(): void {
    this.layout = 'rows';
  }

}
