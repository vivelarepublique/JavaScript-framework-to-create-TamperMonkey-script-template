import { createContext } from 'preact';

interface CounterContextType {
    count: number;
    increment: () => void;
    decrement: () => void;
}

const counterContext = createContext<CounterContextType>({
    count: 0,
    increment: () => {},
    decrement: () => {},
});

export default counterContext;
