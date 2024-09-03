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
        <div>
            <h1 class='framework-test-h-solid'>{msg}</h1>
            <h3 class='framework-test-h3 framework-test-h-solid'>Solid Test Page</h3>
            <div class='framework-test-div'>
                <div>
                    <div>
                        <img src={solidLogo} class='framework-test-large-logo framework-test-rotate-logo' alt='Solid logo' />
                    </div>
                </div>
            </div>
            <div class='framework-test-div'>
                <div>
                    <div>
                        <img src={vueLogo} class='framework-test-logo' alt='Vue logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-vue' href='https://vuejs.org' target='_blank' rel='noopener'>
                            Vue
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={piniaLogo} class='framework-test-logo' alt='Pinia logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-pinia' href='https://pinia.vuejs.org' target='_blank' rel='noopener'>
                            Pinia
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={reactLogo} class='framework-test-logo' alt='React logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-react' href='https://react.dev' target='_blank' rel='noopener'>
                            React
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={reduxLogo} class='framework-test-logo' alt='Redux logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-redux' href='https://redux.js.org' target='_blank' rel='noopener'>
                            Redux
                        </a>
                    </div>
                </div>
            </div>
            <div class='framework-test-div'>
                <div>
                    <div>
                        <img src={lessLogo} class='framework-test-logo less-logo' alt='Less logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-less' href='https://lesscss.org' target='_blank' rel='noopener'>
                            Less
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={sassLogo} class='framework-test-logo sass-logo' alt='Sass logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-sass' href='https://sass-lang.com' target='_blank' rel='noopener'>
                            Sass
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={stylusLogo} class='framework-test-logo stylus-logo' alt='Stylus logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-stylus' href='https://stylus-lang.com' target='_blank' rel='noopener'>
                            Stylus
                        </a>
                    </div>
                </div>
            </div>
            <div class='framework-test-div'>
                <div>
                    <div>
                        <img src={preactLogo} class='framework-test-logo' alt='Preact logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-preact' href='https://preactjs.com' target='_blank' rel='noopener'>
                            Preact
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={litLogo} class='framework-test-logo' alt='Lit logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-lit' href='https://lit.dev' target='_blank' rel='noopener'>
                            Lit
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={svelteLogo} class='framework-test-logo' alt='Svelte logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-svelte' href='https://svelte.dev' target='_blank' rel='noopener'>
                            Svelte
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={solidLogo} class='framework-test-logo' alt='Solid logo' />
                    </div>
                    <div>
                        <a class='framework-test-a-solid' href='https://www.solidjs.com' target='_blank' rel='noopener'>
                            Solid
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
