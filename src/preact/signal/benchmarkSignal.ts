import { signal } from '@preact/signals';
import type { RandomColor } from '../../common/benchmark';
import { generateRandomColor } from '../../common/benchmark';

export const divList = signal<RandomColor[]>([]);

export function emptyRandomColorDiv() {
    divList.value = [];
}

export function addRandomColorDiv(count: number) {
    emptyRandomColorDiv();
    const countBefore = count > 0 ? count : 0;
    const tempRandomColorDiv: RandomColor[] = [];
    for (let i = 0; i < countBefore; i++) {
        const randomColor = generateRandomColor(i);
        tempRandomColorDiv.push(randomColor);
    }
    divList.value = tempRandomColorDiv;
}
