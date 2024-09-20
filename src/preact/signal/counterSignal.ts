import { signal } from '@preact/signals';

export const count = signal<number>(0);

export const increment = () => {
    count.value++;
};

export const decrement = () => {
    count.value--;
};
