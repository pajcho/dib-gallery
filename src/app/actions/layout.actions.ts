import { Action } from '@ngrx/store';

export enum LayoutActionTypes {
  ChangeLayout = '[Layout] Change Layout',
}

export class ChangeLayout implements Action {
  readonly type = LayoutActionTypes.ChangeLayout;

  constructor(readonly payload: { direction: string }) {

  }
}

export type Actions = ChangeLayout;
