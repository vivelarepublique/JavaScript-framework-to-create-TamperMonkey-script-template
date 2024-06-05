import { useState, useEffect } from 'react';
import { sharedState } from './sharedState';

export const useSharedState = (): [{ search: string }, (newState: { search: string }) => void] => {
    const [state, setState] = useState(sharedState);

    useEffect(() => {
        const handleStateChange = () => {
            setState({ ...sharedState });
        };

        window.addEventListener('stateChange', handleStateChange);

        return () => {
            window.removeEventListener('stateChange', handleStateChange);
        };
    }, []);

    return [
        state,
        (newState: { search: string }) => {
            Object.assign(sharedState, newState);
            window.dispatchEvent(new Event('stateChange'));
        },
    ];
};
