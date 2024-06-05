import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from './counter';
import switcherReducer from './switcher';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        switcher: switcherReducer,
    },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
