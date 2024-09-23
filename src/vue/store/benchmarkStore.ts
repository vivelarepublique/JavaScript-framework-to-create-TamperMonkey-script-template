import { reactive } from 'vue';
import { defineStore } from 'pinia';

interface RandomColor {
    backgroundColor: string;
    color: string;
    id: number;
}

export const useBenchmarkStore = defineStore('benchMark', () => {
    const randomColorDiv = reactive<RandomColor[]>([]);

    function emptyRandomColorDiv() {
        randomColorDiv.length = 0;
    }

    function addRandomColorDiv(count: number) {
        emptyRandomColorDiv();
        const countBefore = count > 0 ? count : 0;
        const tempRandomColorDiv: RandomColor[] = [];
        for (let i = 0; i < countBefore; i++) {
            const color = Math.floor(Math.random() * 16777215);
            const backgroundColor = Math.floor(Math.random() * 16777215);

            const randomColor: RandomColor = {
                id: i,
                color: `#${color.toString(16).padStart(6, '0')}}`,
                backgroundColor: `#${backgroundColor.toString(16).padStart(6, '0')}`,
            };
            tempRandomColorDiv.push(randomColor);
        }

        randomColorDiv.push(...tempRandomColorDiv);
    }

    return { randomColorDiv, emptyRandomColorDiv, addRandomColorDiv };
});
