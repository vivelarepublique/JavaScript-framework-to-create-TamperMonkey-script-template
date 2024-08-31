import { createContext } from 'preact';

interface ShowContextType {
    show: boolean;
    open: () => void;
    close: () => void;
}

const ShowContext = createContext<ShowContextType>({
    show: false,
    open: () => {},
    close: () => {},
});

export default ShowContext;
