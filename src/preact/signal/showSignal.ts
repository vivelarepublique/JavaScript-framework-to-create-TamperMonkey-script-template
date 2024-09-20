import { signal } from '@preact/signals';

export const show = signal<boolean>(false);

export const open = () => {
    show.value = true;
};

export const close = () => {
    show.value = false;
};
