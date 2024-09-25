import { createContext } from '@lit/context';

export class CounterStore {
    count = 0;

    increment() {
        this.count++;
    }

    decrement() {
        this.count--;
    }

    incrementByAmount(amount: number) {
        this.count += amount || 0;
    }

    doubleCount() {
        this.count *= 2;
    }

    reset() {
        this.count = 0;
    }
}

export const counterContext = createContext<CounterStore>('counter');
