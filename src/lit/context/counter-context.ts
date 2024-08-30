import { createContext } from '@lit/context';

export class CounterStore {
    count: number = 0;

    increment() {
        this.count += 1;
    }

    decrement() {
        this.count -= 1;
    }
}

export const counterContext = createContext<CounterStore>('counter');
