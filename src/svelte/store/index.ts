import { writable } from 'svelte/store';

export const show = writable<boolean>(false);
export const count = writable<number>(0);
