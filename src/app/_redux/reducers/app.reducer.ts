import * as AppActions from '../actions/app.actions';

export function clearState(reducer) {
    return (state, action) => {

        if (action.type === AppActions.CLEAR_STATE) {
            state = undefined;
        }

        return reducer(state, action);
    };
}
