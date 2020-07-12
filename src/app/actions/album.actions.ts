import {Action} from '@ngrx/store';
import {Album} from '../core/album.model';

export enum AlbumActionTypes {
  LoadAlbums = '[Albums] Load Albums',
  LoadAlbumsStart = '[Albums] Load Albums Start',
  LoadAlbumsError = '[Albums] Load Albums Error',
  LoadAlbumsSuccess = '[Albums] Load Albums Success',
  AllAlbumsLoaded = '[Albums] All Albums Loaded',

  LoadAlbum = '[Album] Load Album',
  LoadAlbumError = '[Album] Load Album Error',
  LoadAlbumSuccess = '[Album] Load Album Success',
}

/**
 * Albums actions
 */
export class LoadAlbums implements Action {
  readonly type = AlbumActionTypes.LoadAlbums;

  constructor(readonly payload: { start: number, end: number }) {

  }
}

export class LoadAlbumsStart implements Action {
  readonly type = AlbumActionTypes.LoadAlbumsStart;
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

export class AllAlbumsLoaded implements Action {
  readonly type = AlbumActionTypes.AllAlbumsLoaded;
}

/**
 * Album actions
 */
export class LoadAlbum implements Action {
  readonly type = AlbumActionTypes.LoadAlbum;

  constructor(readonly payload: { id: number }) {

  }
}

export class LoadAlbumSuccess implements Action {
  readonly type = AlbumActionTypes.LoadAlbumSuccess;

  constructor(readonly payload: { data: Album }) {

  }
}

export class LoadAlbumError implements Action {
  readonly type = AlbumActionTypes.LoadAlbumError;

  constructor(readonly payload: { error: string }) {

  }
}

export type Actions =
  LoadAlbums
  | LoadAlbumsStart
  | LoadAlbumsError
  | LoadAlbumsSuccess
  | AllAlbumsLoaded
  | LoadAlbum
  | LoadAlbumError
  | LoadAlbumSuccess;
