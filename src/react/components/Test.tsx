import React from 'react';

import vueLogo from '../../assets/svg/vue.svg';
import piniaLogo from '../../assets/svg/pinia.svg';
import reactLogo from '../../assets/svg/react.svg';
import reduxLogo from '../../assets/svg/redux.svg';

import lessLogo from '../../assets/svg/less.svg';
import sassLogo from '../../assets/svg/sass.svg';
import stylusLogo from '../../assets/svg/stylus.svg';

import preactLogo from '../../assets/svg/preact.svg';
import litLogo from '../../assets/svg/lit.svg';
import svelteLogo from '../../assets/svg/svelte.svg';
import solidLogo from '../../assets/svg/solid.svg';

import '../css/test.css';

interface Props {
    msg: string;
}

export default function Test(props: Props) {
    const { msg } = props;
    return (
        <React.Fragment>
            <div>
                <h1 className='react-test-h'>{msg}</h1>
                <h3 className='react-test-h'>React Test Page</h3>
                <div className='react-test-div'>
                    <div>
                        <div>
                            <img src={reactLogo} className='test-large-logo react' alt='React logo' />
                        </div>
                    </div>
                </div>
                <div className='react-test-div'>
                    <div>
                        <div>
                            <img src={vueLogo} className='test-logo' alt='Vue logo' />
                        </div>
                        <div>
                            <a className='react-test-a-vue' href='https://vuejs.org' target='_blank' rel='noopener'>
                                Vue
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={piniaLogo} className='test-logo' alt='Pinia logo' />
                        </div>
                        <div>
                            <a className='react-test-a-pinia' href='https://pinia.vuejs.org' target='_blank' rel='noopener'>
                                Pinia
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={reactLogo} className='test-logo' alt='React logo' />
                        </div>
                        <div>
                            <a className='react-test-a-react' href='https://react.dev' target='_blank' rel='noopener'>
                                React
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={reduxLogo} className='test-logo' alt='Redux logo' />
                        </div>
                        <div>
                            <a className='react-test-a-redux' href='https://redux.js.org' target='_blank' rel='noopener'>
                                Redux
                            </a>
                        </div>
                    </div>
                </div>
                <div className='react-test-div'>
                    <div>
                        <div>
                            <img src={lessLogo} className='test-logo less' alt='Less logo' />
                        </div>
                        <div>
                            <a className='react-test-a-less' href='https://lesscss.org' target='_blank' rel='noopener'>
                                Less
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={sassLogo} className='test-logo sass' alt='Sass logo' />
                        </div>
                        <div>
                            <a className='react-test-a-sass' href='https://sass-lang.com' target='_blank' rel='noopener'>
                                Sass
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={stylusLogo} className='test-logo stylus' alt='Stylus logo' />
                        </div>
                        <div>
                            <a className='react-test-a-stylus' href='https://stylus-lang.com' target='_blank' rel='noopener'>
                                Stylus
                            </a>
                        </div>
                    </div>
                </div>
                <div className='react-test-div'>
                    <div>
                        <div>
                            <img src={preactLogo} className='test-logo' alt='Preact logo' />
                        </div>
                        <div>
                            <a className='react-test-a-preact' href='https://preactjs.com' target='_blank' rel='noopener'>
                                Preact
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={litLogo} className='test-logo' alt='Lit logo' />
                        </div>
                        <div>
                            <a className='react-test-a-lit' href='https://lit.dev' target='_blank' rel='noopener'>
                                Lit
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={svelteLogo} className='test-logo' alt='Svelte logo' />
                        </div>
                        <div>
                            <a className='react-test-a-svelte' href='https://svelte.dev' target='_blank' rel='noopener'>
                                Svelte
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={solidLogo} className='test-logo' alt='Solid logo' />
                        </div>
                        <div>
                            <a className='react-test-a-solid' href='https://www.solidjs.com' target='_blank' rel='noopener'>
                                Solid
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
