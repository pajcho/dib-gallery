import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {AlbumActionTypes, Actions} from '../actions/album.actions';
import {Album} from '../core/album.model';

export interface AlbumsState {
  data: Album[] | [];
  loading: boolean;
  allAlbumsLoaded: boolean;
}

const initialAlbumsState: AlbumsState = {
  data: [],
  loading: false,
  allAlbumsLoaded: false,
};

export interface AppState {
  albums: AlbumsState;
}

export function albumsReducer(state: AlbumsState = initialAlbumsState, action: Actions): AlbumsState {
  switch (action.type) {
    /**
     * Albums
     */
    case AlbumActionTypes.LoadAlbums:
      return state;

    case AlbumActionTypes.LoadAlbumsStart:
      return {
        data: [],
        loading: true,
        allAlbumsLoaded: state.allAlbumsLoaded,
      };

    case AlbumActionTypes.LoadAlbumsSuccess:
      return {
        data: action.payload.data,
        loading: false,
        allAlbumsLoaded: true,
      };

    case AlbumActionTypes.LoadAlbumsError:
      return {
        data: [],
        loading: false,
        allAlbumsLoaded: false,
      };

    /**
     * Album
     */
    case AlbumActionTypes.LoadAlbum:
      return state;

    case AlbumActionTypes.LoadAlbumSuccess:
      return {
        data: [action.payload.data],
        loading: false,
        allAlbumsLoaded: state.allAlbumsLoaded,
      };

    case AlbumActionTypes.LoadAlbumError:
      return {
        data: state.data,
        loading: false,
        allAlbumsLoaded: state.allAlbumsLoaded,
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  albums: albumsReducer,
};

export const selectAlbums = (state: AppState) => state.albums.data;
export const albumListLoading = (state: AppState) => state.albums.loading;
export const allAlbumsLoaded = (state: AppState) => state.albums.allAlbumsLoaded;

export const selectAlbum = (id: number) => {
  return createSelector(
    selectAlbums,
    albums => albums[id]
  );
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
