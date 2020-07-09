import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {AlbumActionTypes, LoadAlbums,  LoadAlbumsSuccess, LoadAlbumsError} from '../actions/album.actions';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {AppState} from '../reducers';
import {Store} from '@ngrx/store';
import {AlbumService} from '../core/album.service';
import {of} from 'rxjs';

@Injectable()
export class AlbumEffects {

  @Effect()
  loadAlbums$ = this.actions$.pipe(
    ofType<LoadAlbums>(AlbumActionTypes.LoadAlbums),
    mergeMap(() => this.albumService.list().pipe(
      map(albums => {
        return (new LoadAlbumsSuccess({data: albums}));
      }),
      catchError((errorMessage) => of(new LoadAlbumsError({error: errorMessage})))
    ))
  );

  constructor(private actions$: Actions, private store: Store<AppState>, private albumService: AlbumService) {
  }

}
