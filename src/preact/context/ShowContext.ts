import { createContext } from 'preact';

const ShowContext = createContext<{ show: boolean; setShow: (...args: any[]) => any }>({
    show: false,
    setShow: () => {},
});

export default ShowContext;
