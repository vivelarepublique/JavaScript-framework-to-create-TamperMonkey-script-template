import { createSignal } from 'solid-js';

export const [show, setShow] = createSignal<boolean>(false);

export const open = () => setShow(true);
export const close = () => setShow(false);
