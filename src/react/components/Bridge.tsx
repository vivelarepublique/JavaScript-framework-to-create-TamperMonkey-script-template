import React from 'react';

import { useSharedState } from '../../shared/reactState/useSharedState';

export default function Bridge() {
    const [state, _] = useSharedState();
    return (
        <React.Fragment>
            <div>
                <h1>Bridge</h1>
                <p>Value: {state.search}</p>
            </div>
        </React.Fragment>
    );
}
