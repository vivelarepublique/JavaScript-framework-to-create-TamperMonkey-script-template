import { createSignal } from 'solid-js';
import type { RandomColor } from '../../common/benchmark';
import { generateRandomColor } from '../../common/benchmark';

export const [divList, setDivList] = createSignal<RandomColor[]>([]);

export const emptyRandomColorDiv = () => {
    setDivList([]);
};

export const addRandomColorDiv = (count: number) => {
    emptyRandomColorDiv();
    const countBefore = count > 0 ? count : 0;
    const tempRandomColorDiv: RandomColor[] = [];
    for (let i = 0; i < countBefore; i++) {
        const randomColor = generateRandomColor(i);
        tempRandomColorDiv.push(randomColor);
    }
    setDivList(tempRandomColorDiv);
};
