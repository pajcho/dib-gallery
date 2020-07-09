import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {AlbumActionTypes, AlbumAction} from '../actions/album.actions';
import {Album} from '../core/album.model';

export interface AlbumsState {
  data: Album[] | [];
  loading: boolean;
}

const initialAlbumsState: AlbumsState = {
  data: [],
  loading: false,
};

export interface AppState {
  albums: AlbumsState;
}

export function albumsReducer(state: AlbumsState = initialAlbumsState, action: AlbumAction): AlbumsState {
  switch (action.type) {
    case AlbumActionTypes.LoadAlbums:
      return {
        data: [],
        loading: true,
      };

    case AlbumActionTypes.LoadAlbumsSuccess:
      return {
        data: action.payload.data,
        loading: false,
      };

    case AlbumActionTypes.LoadAlbumsError:
      return {
        data: [],
        loading: false,
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  albums: albumsReducer,
};

export const selectAlbums = (state: AppState) => state.albums.data;

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
