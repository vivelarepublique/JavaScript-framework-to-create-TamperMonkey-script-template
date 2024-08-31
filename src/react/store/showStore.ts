import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

const showSlice = createSlice({
    name: 'show',
    initialState: {
        value: false,
    },
    reducers: {
        open: state => {
            state.value = true;
        },
        close: state => {
            state.value = false;
        },
    },
});

export const { open, close } = showSlice.actions;
export const show = (state: RootState) => state.show.value;

export default showSlice.reducer;
