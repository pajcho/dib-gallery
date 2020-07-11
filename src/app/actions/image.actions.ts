import {Action} from '@ngrx/store';
import {Image} from '../core/image.model';

export enum ImageActionTypes {
  DeleteImage = '[Image] Delete Image',
  DeleteImageSuccess = '[Image] Delete Image Success',
}

export class DeleteImage implements Action {
  readonly type = ImageActionTypes.DeleteImage;

  constructor(readonly payload: { data: Image }) {

  }
}

export class DeleteImageSuccess implements Action {
  readonly type = ImageActionTypes.DeleteImageSuccess;

  constructor(readonly payload: { data: Image }) {

  }
}

export type Actions = DeleteImage | DeleteImageSuccess;
