import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import type { RandomColor } from '../../common/benchmark';
import { generateRandomColor } from '../../common/benchmark';

const benchmarkSlice = createSlice({
    name: 'benchmark',
    initialState: {
        value: [] as RandomColor[],
    },
    reducers: {
        emptyRandomColorDiv: _state => {
            return {
                value: [] as RandomColor[],
            };
        },
        addRandomColorDiv: (_state, action) => {
            const count = (action.payload > 0 ? action.payload : 0) as number;
            const tempRandomColorDiv: RandomColor[] = [];
            for (let i = 0; i < count; i++) {
                const randomColor = generateRandomColor(i);
                tempRandomColorDiv.push(randomColor);
            }

            return {
                value: tempRandomColorDiv,
            };
        },
    },
});

export const { emptyRandomColorDiv, addRandomColorDiv } = benchmarkSlice.actions;
export const divList = (state: RootState) => state.benchmark.value;

export default benchmarkSlice.reducer;
