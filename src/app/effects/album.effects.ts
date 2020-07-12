import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  AlbumActionTypes,
  LoadAlbums,
  LoadAlbumsSuccess,
  LoadAlbumsError,
  LoadAlbum,
  LoadAlbumError,
  LoadAlbumSuccess, LoadAlbumsStart, AllAlbumsLoaded
} from '../actions/album.actions';
import {map, catchError, flatMap, filter, withLatestFrom, tap, switchMap} from 'rxjs/operators';
import {allAlbumsLoaded, AppState, selectAlbums} from '../reducers';
import {select, Store} from '@ngrx/store';
import {AlbumService} from '../core/album.service';
import {forkJoin, of} from 'rxjs';
import {Album} from '../core/album.model';
import {Image} from '../core/image.model';
import {User} from '../core/user.model';

@Injectable()
export class AlbumEffects {

  @Effect()
  loadAlbums$ = this.actions$.pipe(
    ofType<LoadAlbums>(AlbumActionTypes.LoadAlbums),
    withLatestFrom(this.store.pipe(select(allAlbumsLoaded))),
    // If album is already in store stop here
    filter(([, loaded]) => !loaded),
    // Trigger the loader and clear album list
    tap(() => this.store.dispatch(new LoadAlbumsStart())),
    // Otherwise we have to call the api to get the album details
    flatMap(
      ([action]) => forkJoin([of(action), this.albumService.list().pipe(
        catchError((errorMessage) => of(new LoadAlbumsError({error: errorMessage})))
      )])
    ),
    filter(result => !(result instanceof LoadAlbumsError)),
    map(([action, albums]) => {
      let filteredAlbums = [];

      if ((albums as Album[]).length <= action.payload.start) {
        // No more albums to load so we prevent further api calls
        this.store.dispatch(new AllAlbumsLoaded());
      } else {
        filteredAlbums = (albums as Album[]).slice(action.payload.start, action.payload.end);
      }

      return filteredAlbums;
    }),
    flatMap(
      (albums: Album[]) => forkJoin([of(albums), ...albums.map(album => {
        return forkJoin([album.getImages(), album.getUser()]);
      })]),
    ),
    map(result => {
      const albums = result.shift();

      albums.forEach((album, index) => {
        album.images = result[index][0];
        album.user = result[index][1];
      });

      return new LoadAlbumsSuccess({data: albums as Album[]});
    }),
  );

  @Effect()
  loadAlbum$ = this.actions$.pipe(
    ofType<LoadAlbum>(AlbumActionTypes.LoadAlbum),
    withLatestFrom(this.store.pipe(select(selectAlbums))),
    // If album is already in store stop here
    filter(([action, albums]) => !albums.find((album: Album) => album.id === action.payload.id)),
    // Otherwise we have to call the api to get the album details
    flatMap(([action]) => this.albumService.get(action.payload.id).pipe(
      catchError((errorMessage) => of(new LoadAlbumError({error: errorMessage})))
    )),
    filter(result => !(result instanceof LoadAlbumError)),
    flatMap(
      (album: Album) => forkJoin([of(album), album.getImages(), album.getUser()]),
    ),
    map(([album, images, user]: [Album, Image[], User]) => {
      album.images = images;
      album.user = user;

      return new LoadAlbumSuccess({data: album});
    }),
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private albumService: AlbumService) {
  }

}
