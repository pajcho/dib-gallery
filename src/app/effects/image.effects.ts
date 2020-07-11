import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {map} from 'rxjs/operators';
import {DeleteImage, DeleteImageSuccess, ImageActionTypes} from '../actions/image.actions';

@Injectable()
export class ImageEffects {

  @Effect()
  deleteImage$ = this.actions$.pipe(
    ofType<DeleteImage>(ImageActionTypes.DeleteImage),
    map((action) => {
      return new DeleteImageSuccess({data: action.payload.data});
    }),
  );

  constructor(private actions$: Actions) {
  }

}
