import { createSignal } from 'solid-js';

export const [count, setCount] = createSignal<number>(0);

export const increment = () => {
    setCount(prev => prev + 1);
};

export const decrement = () => {
    setCount(prev => prev - 1);
};

export const incrementByAmount = (value: number) => {
    setCount(prev => prev + value || 0);
};

export const doubleCount = () => {
    setCount(prev => prev * 2);
};

export const reset = () => {
    setCount(0);
};
