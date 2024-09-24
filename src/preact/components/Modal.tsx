import { Fragment } from 'preact';
import type { JSX } from 'preact';
import { useState, useCallback } from 'preact/hooks';

import VectorImage from './VectorImage';
import Counter from './Counter';
import WindowEvent from './WindowEvent';
import Benchmark from './Benchmark';

import { close } from '../signal/showSignal';

const componentsMap: Record<string, () => JSX.Element> = {
    VectorImage,
    Counter,
    WindowEvent,
    Benchmark,
};

interface Props {
    msg: string;
}

export default function Modal(props: Props) {
    const [currentView, setCurrentView] = useState('VectorImage');
    const ComponentToRender = componentsMap[currentView];
    const { msg } = props;

    const _close = useCallback((event: Event) => {
        event.stopPropagation();
        if (event.target === event.currentTarget) {
            close();
        }
    }, []);

    return (
        <Fragment>
            <div class='framework-test-modal-mask' onClick={_close}>
                <div class='framework-test-modal-container'>
                    <span>
                        <button class='framework-test-modal-close-button' onClick={close}>
                            &times;
                        </button>
                    </span>
                    <div class='container-fluid text-center'>
                        <div class='row'>
                            <div class='col-2'>
                                <p class='framework-test-header-preact framework-test-heavy'>{msg}</p>
                                <div class='btn-group-vertical' role='group'>
                                    <button type='button' class={currentView === 'VectorImage' ? 'btn btn-framework-test btn-framework-test-preact' : 'btn btn-framework-test'} onClick={() => setCurrentView('VectorImage')}>
                                        Vector Image
                                    </button>
                                    <button type='button' class={currentView === 'Counter' ? 'btn btn-framework-test btn-framework-test-preact' : 'btn btn-framework-test'} onClick={() => setCurrentView('Counter')}>
                                        Counter
                                    </button>
                                    <button type='button' class={currentView === 'WindowEvent' ? 'btn btn-framework-test btn-framework-test-preact' : 'btn btn-framework-test'} onClick={() => setCurrentView('WindowEvent')}>
                                        Window Event
                                    </button>
                                    <button type='button' class={currentView === 'Benchmark' ? 'btn btn-framework-test btn-framework-test-preact' : 'btn btn-framework-test'} onClick={() => setCurrentView('Benchmark')}>
                                        Benchmark
                                    </button>
                                </div>
                            </div>
                            <div class='col-8'>
                                <ComponentToRender />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
