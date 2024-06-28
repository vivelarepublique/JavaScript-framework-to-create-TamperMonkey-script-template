import React from 'react';

import vueLogo from '../../assets/svg/vue.svg';
import piniaLogo from '../../assets/svg/pinia.svg';
import reactLogo from '../../assets/svg/react.svg';
import reduxLogo from '../../assets/svg/redux.svg';
import lessLogo from '../../assets/svg/less.svg';
import sassLogo from '../../assets/svg/sass.svg';
import stylusLogo from '../../assets/svg/stylus.svg';

import '../css/test.css';

interface Props {
    msg: string;
}

export default function Test(props: Props) {
    const { msg } = props;
    return (
        <React.Fragment>
            <div>
                <h1>{msg}</h1>
                <h3 className='react-test-class'>React Test Page</h3>
                <div className='react-test-class'>
                    <div></div>
                    <div>
                        <div>
                            <img src={reactLogo} className='test-large-logo react' alt='React logo' />
                        </div>
                    </div>
                    <div></div>
                </div>
                <div className='react-test-class'>
                    <div>
                        <div>
                            <img src={vueLogo} className='test-logo' alt='Vue logo' />
                        </div>
                        <div>
                            <a className='react-test-class-vue' href='https://vuejs.org' target='_blank' rel='noopener'>
                                Vue
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={piniaLogo} className='test-logo' alt='Pinia logo' />
                        </div>
                        <div>
                            <a className='react-test-class-pinia' href='https://pinia.vuejs.org' target='_blank' rel='noopener'>
                                Pinia
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={reactLogo} className='test-logo' alt='React logo' />
                        </div>
                        <div>
                            <a className='react-test-class-react' href='https://react.dev' target='_blank' rel='noopener'>
                                React
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={reduxLogo} className='test-logo' alt='Redux logo' />
                        </div>
                        <div>
                            <a className='react-test-class-redux' href='https://redux.js.org' target='_blank' rel='noopener'>
                                Redux
                            </a>
                        </div>
                    </div>
                </div>
                <div className='react-test-class'>
                    <div>
                        <div>
                            <img src={lessLogo} className='test-logo less' alt='Less logo' />
                        </div>
                        <div>
                            <a className='react-test-class-less' href='https://lesscss.org' target='_blank' rel='noopener'>
                                Less
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={sassLogo} className='test-logo sass' alt='Sass logo' />
                        </div>
                        <div>
                            <a className='react-test-class-sass' href='https://sass-lang.com' target='_blank' rel='noopener'>
                                Sass
                            </a>
                        </div>
                    </div>
                    <div>
                        <div>
                            <img src={stylusLogo} className='test-logo stylus' alt='Stylus logo' />
                        </div>
                        <div>
                            <a className='react-test-class-stylus' href='https://stylus-lang.com' target='_blank' rel='noopener'>
                                Stylus
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
