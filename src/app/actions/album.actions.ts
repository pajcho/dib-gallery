import {Action} from '@ngrx/store';
import {Album} from '../core/album.model';

export enum AlbumActionTypes {
  LoadAlbums = '[Albums] Load Albums',
  LoadAlbumsError = '[Albums] Load Albums Error',
  LoadAlbumsSuccess = '[Albums] Load Albums Success',
}

export class AlbumAction implements Action {
  type: string;
  payload: {
    data: Album[],
    loading: boolean,
  };
}

export class LoadAlbums implements Action {
  readonly type = AlbumActionTypes.LoadAlbums;
}

export class LoadAlbumsSuccess implements Action {
  readonly type = AlbumActionTypes.LoadAlbumsSuccess;

  constructor(readonly payload: { data: Album[] }) {

  }
}

export class LoadAlbumsError implements Action {
  readonly type = AlbumActionTypes.LoadAlbumsError;

  constructor(readonly payload: { error: string }) {

  }
}

export type AlbumActions = LoadAlbums | LoadAlbumsError | LoadAlbumsSuccess;
