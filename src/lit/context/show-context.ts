import { createContext } from '@lit/context';

export class showStore {
    show: boolean = false;

    open() {
        this.show = true;
    }

    close() {
        this.show = false;
    }
}

export const showContext = createContext<showStore>('show');
