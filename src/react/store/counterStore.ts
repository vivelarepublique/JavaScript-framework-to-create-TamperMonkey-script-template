import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        value: 0,
    },
    reducers: {
        increment: state => {
            state.value++;
        },
        decrement: state => {
            state.value--;
        },
    },
});

export const { increment, decrement } = counterSlice.actions;
export const count = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
