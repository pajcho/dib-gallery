import {Component, OnInit} from '@angular/core';
import {AlbumService} from '../core/album.service';
import {ImageService} from '../core/image.service';
import {UserService} from '../core/user.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {albumListLoading, AppState, selectAlbums} from '../reducers';
import {LoadAlbums} from '../actions/album.actions';
import {Album} from '../core/album.model';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  albums = [];
  albums$: Observable<Album[]>;
  loading$: Observable<boolean>;
  layout = 'columns';

  constructor(private albumService: AlbumService, private imageService: ImageService,
              private userService: UserService, private store: Store<AppState>) {

    this.albums$ = this.store.pipe(select(selectAlbums));
    this.loading$ = this.store.pipe(select(albumListLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadAlbums());
  }

  gridColumns(): void {
    this.layout = 'columns';
  }

  gridRows(): void {
    this.layout = 'rows';
  }

}
