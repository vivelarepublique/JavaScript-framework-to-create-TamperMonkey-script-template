import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterStore';
import showReducer from './showStore';
import benchmarkReducer from './benchmarkStore';

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        show: showReducer,
        benchmark: benchmarkReducer,
    },
});
// export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
