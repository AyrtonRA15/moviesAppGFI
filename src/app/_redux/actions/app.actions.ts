import { Action } from '@ngrx/store';

export const CLEAR_STATE = '[APP] CLEAR_STATE';

export class ClearState implements Action {
    public readonly type = CLEAR_STATE;
}

export type Actions = ClearState;
