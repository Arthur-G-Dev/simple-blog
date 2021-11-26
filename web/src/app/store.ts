import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import rootReducer from "./root-reducer";
import thunk from 'redux-thunk'
import api from '../services/api'



export const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk.withExtraArgument(api)]
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
