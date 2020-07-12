import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlbumService} from '../core/album.service';
import {ImageService} from '../core/image.service';
import {UserService} from '../core/user.service';
import {Observable, Subscription} from 'rxjs';
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
export class AlbumsComponent implements OnInit, OnDestroy {
  perPage = 12;
  albums: Album[] = [];
  allAlbums: Album[] = [];
  albums$: Observable<Album[]>;
  loading$: Observable<boolean>;
  layout$: Observable<string>;
  subscription: Subscription;

  constructor(private albumService: AlbumService, private imageService: ImageService,
              private userService: UserService, private store: Store<AppState>) {

    this.layout$ = this.store.pipe(select(layoutDirection));
    this.albums$ = this.store.pipe(select(selectAlbums));
    this.loading$ = this.store.pipe(select(albumListLoading));
  }

  ngOnInit(): void {
    this.store.dispatch(new LoadAlbums());

    this.subscription = this.albums$.subscribe(albums => {
      this.allAlbums = albums;
      this.albums = albums.slice(0, this.perPage);
    });
  }

  gridColumns(): void {
    this.store.dispatch(new ChangeLayout({direction: 'columns'}));
  }

  gridRows(): void {
    this.store.dispatch(new ChangeLayout({direction: 'rows'}));
  }

  onScrollDown(): void {
    // TODO: Ideally we would just dispatch action here to load more items

    // Check if there are more items to load
    if (this.allAlbums.length > this.albums.length) {
      // Load more albums
      const newAlbums = this.allAlbums.slice(this.albums.length, this.albums.length + this.perPage);
      this.albums = [...this.albums, ...newAlbums];
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
