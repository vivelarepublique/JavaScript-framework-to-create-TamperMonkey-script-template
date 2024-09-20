import { writable } from 'svelte/store';

export const show = writable<boolean>(false);

export const open = () => {
    show.set(true);
};

export const close = () => {
    show.set(false);
};
