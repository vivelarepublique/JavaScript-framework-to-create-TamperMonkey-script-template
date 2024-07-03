import { createContext } from 'preact';

const counterContext = createContext<{ count: number; increment: (...args: any[]) => any; decrement: (...args: any[]) => any }>({
    count: 0,
    increment: () => {},
    decrement: () => {},
});

export default counterContext;
