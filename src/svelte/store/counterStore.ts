import { writable } from 'svelte/store';

export const count = writable(0);

export const increment = () => {
    count.update(value => value + 1);
};

export const decrement = () => {
    count.update(value => value - 1);
};

export const incrementByAmount = (amount: number) => {
    count.update(value => value + amount || 0);
};

export const doubleCount = () => {
    count.update(value => value * 2);
};

export const reset = () => {
    count.set(0);
};
