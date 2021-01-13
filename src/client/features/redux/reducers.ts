import {
  combineReducers,
  Reducer,
  CombinedState,
  AnyAction,
} from '@reduxjs/toolkit';
import serverReducer, {
  GlobalServerState,
} from '~client/features/server/serverSlice';
import countReducer, {
  GlobalCountState,
} from '~client/features/count/countSlice';

export const rootReducer: Reducer<
  CombinedState<GlobalServerState & GlobalCountState>,
  AnyAction
> = combineReducers({
  server: serverReducer,
  count: countReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
