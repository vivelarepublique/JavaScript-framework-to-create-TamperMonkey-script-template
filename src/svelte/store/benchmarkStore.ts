import { writable } from 'svelte/store';
import type { RandomColor } from '../../common/components/benchmark';
import { generateRandomColor } from '../../common/components/benchmark';

export const divList = writable<RandomColor[]>([]);

export const emptyRandomColorDiv = () => {
    divList.set([]);
};

export const addRandomColorDiv = (count: number) => {
    emptyRandomColorDiv();
    const countBefore = count > 0 ? count : 0;
    const tempRandomColorDiv: RandomColor[] = [];
    for (let i = 0; i < countBefore; i++) {
        const randomColor = generateRandomColor(i);
        tempRandomColorDiv.push(randomColor);
    }
    divList.set(tempRandomColorDiv);
};
