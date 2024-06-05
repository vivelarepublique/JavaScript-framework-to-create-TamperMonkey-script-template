import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

const switcherSlice = createSlice({
    name: 'switcher',
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

export const { open, close } = switcherSlice.actions;
export const show = (state: RootState) => state.switcher.value;

export default switcherSlice.reducer;
