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
                <p className='framework-test-header-react framework-test-heavy'>{msg}</p>
                <p className='framework-test-header-react'>React Test Page</p>
                <div className='framework-test-div'>
                    <div>
                        <div>
                            <img src={reactLogo} className='framework-test-large-logo framework-test-rotate-logo' alt='React logo' />
                        </div>
                    </div>
                </div>
                <div className='framework-test-div'>
                    <div>
                        <div>
                            <img src={vueLogo} className='framework-test-logo' alt='Vue logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-vue' href='https://vuejs.org' target='_blank' rel='noopener'>
                                Vue
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={piniaLogo} className='framework-test-logo' alt='Pinia logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-pinia' href='https://pinia.vuejs.org' target='_blank' rel='noopener'>
                                Pinia
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={reactLogo} className='framework-test-logo' alt='React logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-react' href='https://react.dev' target='_blank' rel='noopener'>
                                React
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={reduxLogo} className='framework-test-logo' alt='Redux logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-redux' href='https://redux.js.org' target='_blank' rel='noopener'>
                                Redux
                            </a>
                        </div>
                    </div>
                </div>
                <div className='framework-test-div'>
                    <div>
                        <div>
                            <img src={lessLogo} className='framework-test-logo less-logo' alt='Less logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-less' href='https://lesscss.org' target='_blank' rel='noopener'>
                                Less
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={sassLogo} className='framework-test-logo sass-logo' alt='Sass logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-sass' href='https://sass-lang.com' target='_blank' rel='noopener'>
                                Sass
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={stylusLogo} className='framework-test-logo stylus-logo' alt='Stylus logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-stylus' href='https://stylus-lang.com' target='_blank' rel='noopener'>
                                Stylus
                            </a>
                        </div>
                    </div>
                </div>
                <div className='framework-test-div'>
                    <div>
                        <div>
                            <img src={preactLogo} className='framework-test-logo' alt='Preact logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-preact' href='https://preactjs.com' target='_blank' rel='noopener'>
                                Preact
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={litLogo} className='framework-test-logo' alt='Lit logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-lit' href='https://lit.dev' target='_blank' rel='noopener'>
                                Lit
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={svelteLogo} className='framework-test-logo' alt='Svelte logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-svelte' href='https://svelte.dev' target='_blank' rel='noopener'>
                                Svelte
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={solidLogo} className='framework-test-logo' alt='Solid logo' />
                        </div>
                        <div>
                            <a className='framework-test-a-solid' href='https://www.solidjs.com' target='_blank' rel='noopener'>
                                Solid
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
