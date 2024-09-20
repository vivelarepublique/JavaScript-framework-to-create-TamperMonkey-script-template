import { writable } from 'svelte/store';

export const count = writable<number>(0);

export const increment = () => {
    count.update(value => value + 1);
};

export const decrement = () => {
    count.update(value => value - 1);
};
