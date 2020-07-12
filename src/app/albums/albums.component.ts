import {Component, OnInit} from '@angular/core';
import {AlbumService} from '../core/album.service';
import {ImageService} from '../core/image.service';
import {UserService} from '../core/user.service';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {albumListLoading, AppState, layoutDirection, selectAlbums} from '../reducers';
import {LoadAlbums} from '../actions/album.actions';
import {Album} from '../core/album.model';
import {ChangeLayout} from '../actions/layout.actions';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  perPage = 12;
  currentPage = 1;
  albums$: Observable<Album[]>;
  loading$: Observable<boolean>;
  layout$: Observable<string>;

  constructor(private albumService: AlbumService, private imageService: ImageService,
              private userService: UserService, private store: Store<AppState>) {

    this.layout$ = this.store.pipe(select(layoutDirection));
    this.albums$ = this.store.pipe(select(selectAlbums));
    this.loading$ = this.store.pipe(select(albumListLoading));
  }

  ngOnInit(): void {
    // Load first page of albums
    this.store.dispatch(new LoadAlbums({start: 0, end: this.perPage}));
  }

  gridColumns(): void {
    this.store.dispatch(new ChangeLayout({direction: 'columns'}));
  }

  gridRows(): void {
    this.store.dispatch(new ChangeLayout({direction: 'rows'}));
  }

  onScrollDown(): void {
    const start = this.currentPage * this.perPage;
    this.currentPage += 1;
    const end = this.currentPage * this.perPage;

    this.store.dispatch(new LoadAlbums({start, end}));
  }
}
