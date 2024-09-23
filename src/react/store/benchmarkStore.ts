import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface RandomColor {
    backgroundColor: string;
    color: string;
    id: number;
}

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
                const color = Math.floor(Math.random() * 16777215);
                const backgroundColor = Math.floor(Math.random() * 16777215);

                const randomColor: RandomColor = {
                    id: i,
                    color: `#${color.toString(16).padStart(6, '0')}}`,
                    backgroundColor: `#${backgroundColor.toString(16).padStart(6, '0')}`,
                };

                tempRandomColorDiv.push(randomColor);
            }

            return {
                value: tempRandomColorDiv,
            };
        },
    },
});

export const { emptyRandomColorDiv, addRandomColorDiv } = benchmarkSlice.actions;
export const randomColorDiv = (state: RootState) => state.benchmark.value;

export default benchmarkSlice.reducer;
