import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { RandomColor } from '../../common/benchmark';
import { generateRandomColor } from '../../common/benchmark';

export const useBenchmarkStore = defineStore('benchMark', () => {
    const divList = reactive<RandomColor[]>([]);

    function emptyRandomColorDiv() {
        divList.length = 0;
    }

    function addRandomColorDiv(count: number) {
        emptyRandomColorDiv();
        const countBefore = count > 0 ? count : 0;
        const tempRandomColorDiv: RandomColor[] = [];
        for (let i = 0; i < countBefore; i++) {
            const randomColor = generateRandomColor(i);
            tempRandomColorDiv.push(randomColor);
        }

        divList.push(...tempRandomColorDiv);
    }

    return { divList, emptyRandomColorDiv, addRandomColorDiv };
});
