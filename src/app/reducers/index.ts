import {ActionReducerMap, createSelector, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {AlbumActionTypes, Actions} from '../actions/album.actions';
import * as Image from '../actions/image.actions';
import {Album} from '../core/album.model';
import {ImageActionTypes} from '../actions/image.actions';
import * as Layout from '../actions/layout.actions';

export interface AlbumsState {
  data: Album[];
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
  layout: LayoutState;
}

export function albumsReducer(state: AlbumsState = initialAlbumsState, action: Actions | Image.Actions): AlbumsState {
  switch (action.type) {
    /**
     * Albums
     */
    case AlbumActionTypes.LoadAlbums:
      return {
        // If we have only one item in the state that means we navigated to albums page
        // from a single album, and we want to overwrite the state and load all albums
        data: state.data.length === 1 ? [] : state.data,
        loading: state.loading,
        allAlbumsLoaded: state.allAlbumsLoaded,
      };

    case AlbumActionTypes.LoadAlbumsStart:
      return {
        data: state.data,
        loading: true,
        allAlbumsLoaded: state.allAlbumsLoaded,
      };

    case AlbumActionTypes.LoadAlbumsSuccess:
      return {
        data: [...state.data, ...action.payload.data],
        loading: false,
        allAlbumsLoaded: state.allAlbumsLoaded,
      };

    case AlbumActionTypes.LoadAlbumsError:
      return {
        data: [],
        loading: false,
        allAlbumsLoaded: false,
      };

    case AlbumActionTypes.AllAlbumsLoaded:
      return {
        data: state.data,
        loading: false,
        allAlbumsLoaded: true,
      };

    /**
     * Album
     */
    case AlbumActionTypes.LoadAlbum:
      return state;

    case AlbumActionTypes.LoadAlbumStart:
      return {
        data: state.data,
        loading: true,
        allAlbumsLoaded: state.allAlbumsLoaded,
      };

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

    /**
     * Image
     */
    case ImageActionTypes.DeleteImage:
      return state;

    case ImageActionTypes.DeleteImageSuccess:
      return {
        // Delete image from the store album
        data: (state.data as Album[]).map(album => {
          album.images = album.images.filter(image => image.id !== action.payload.data.id);

          return album;
        }),
        loading: false,
        allAlbumsLoaded: state.allAlbumsLoaded,
      };

    default:
      return state;
  }
}


export interface LayoutState {
  direction: string;
}

const initialLayoutState: LayoutState = {
  direction: 'columns',
};

export function layoutReducer(state: LayoutState = initialLayoutState, action: Layout.Actions): LayoutState {
  switch (action.type) {
    case Layout.LayoutActionTypes.ChangeLayout:
      return {
        direction: action.payload.direction
      };

    default:
      return state;
  }
}

export const reducers: ActionReducerMap<AppState> = {
  albums: albumsReducer,
  layout: layoutReducer,
};

export const selectAlbums = (state: AppState) => state.albums.data;
export const albumListLoading = (state: AppState) => state.albums.loading;
export const allAlbumsLoaded = (state: AppState) => state.albums.allAlbumsLoaded;

export const layoutDirection = (state: AppState) => state.layout.direction;

export const selectAlbum = (id: number) => {
  return createSelector(
    selectAlbums,
    albums => albums[id]
  );
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];
