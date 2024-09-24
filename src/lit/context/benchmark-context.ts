import { createContext } from '@lit/context';
import type { RandomColor } from '../../common/benchmark';
import { generateRandomColor } from '../../common/benchmark';

export class BenchmarkStore {
    divList: RandomColor[] = [];

    emptyRandomColorDiv() {
        this.divList.length = 0;
    }

    addRandomColorDiv(count: number) {
        this.emptyRandomColorDiv();
        const countBefore = count > 0 ? count : 0;
        const tempRandomColorDiv: RandomColor[] = [];
        for (let i = 0; i < countBefore; i++) {
            const randomColor = generateRandomColor(i);
            tempRandomColorDiv.push(randomColor);
        }
        this.divList = tempRandomColorDiv;
    }
}

export const benchmarkContext = createContext<BenchmarkStore>('benchmark');
