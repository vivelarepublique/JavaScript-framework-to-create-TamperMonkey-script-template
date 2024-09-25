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
        incrementByAmount: (state, action) => {
            state.value += Number(action.payload) || 0;
        },
        doubleCount: state => {
            state.value *= 2;
        },
        reset: state => {
            state.value = 0;
        },
    },
});

export const { increment, decrement, incrementByAmount, doubleCount, reset } = counterSlice.actions;
export const count = (state: RootState) => state.counter.value;

export default counterSlice.reducer;
