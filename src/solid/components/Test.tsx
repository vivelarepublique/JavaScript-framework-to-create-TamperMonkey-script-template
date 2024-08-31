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
            <h1 class='test-h-solid'>{msg}</h1>
            <h3 class='test-h3 test-h-solid'>Solid Test Page</h3>
            <div class='test-div'>
                <div>
                    <div>
                        <img src={solidLogo} class='test-large-logo solid-logo' alt='Solid logo' />
                    </div>
                </div>
            </div>
            <div class='test-div'>
                <div>
                    <div>
                        <img src={vueLogo} class='test-logo' alt='Vue logo' />
                    </div>
                    <div>
                        <a class='test-a-vue' href='https://vuejs.org' target='_blank' rel='noopener'>
                            Vue
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={piniaLogo} class='test-logo' alt='Pinia logo' />
                    </div>
                    <div>
                        <a class='test-a-pinia' href='https://pinia.vuejs.org' target='_blank' rel='noopener'>
                            Pinia
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={reactLogo} class='test-logo' alt='React logo' />
                    </div>
                    <div>
                        <a class='test-a-react' href='https://react.dev' target='_blank' rel='noopener'>
                            React
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={reduxLogo} class='test-logo' alt='Redux logo' />
                    </div>
                    <div>
                        <a class='test-a-redux' href='https://redux.js.org' target='_blank' rel='noopener'>
                            Redux
                        </a>
                    </div>
                </div>
            </div>
            <div class='test-div'>
                <div>
                    <div>
                        <img src={lessLogo} class='test-logo less-logo' alt='Less logo' />
                    </div>
                    <div>
                        <a class='test-a-less' href='https://lesscss.org' target='_blank' rel='noopener'>
                            Less
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={sassLogo} class='test-logo sass-logo' alt='Sass logo' />
                    </div>
                    <div>
                        <a class='test-a-sass' href='https://sass-lang.com' target='_blank' rel='noopener'>
                            Sass
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={stylusLogo} class='test-logo stylus-logo' alt='Stylus logo' />
                    </div>
                    <div>
                        <a class='test-a-stylus' href='https://stylus-lang.com' target='_blank' rel='noopener'>
                            Stylus
                        </a>
                    </div>
                </div>
            </div>
            <div class='test-div'>
                <div>
                    <div>
                        <img src={preactLogo} class='test-logo' alt='Preact logo' />
                    </div>
                    <div>
                        <a class='test-a-preact' href='https://preactjs.com' target='_blank' rel='noopener'>
                            Preact
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={litLogo} class='test-logo' alt='Lit logo' />
                    </div>
                    <div>
                        <a class='test-a-lit' href='https://lit.dev' target='_blank' rel='noopener'>
                            Lit
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={svelteLogo} class='test-logo' alt='Svelte logo' />
                    </div>
                    <div>
                        <a class='test-a-svelte' href='https://svelte.dev' target='_blank' rel='noopener'>
                            Svelte
                        </a>
                    </div>
                </div>
                <div>
                    <div>
                        <img src={solidLogo} class='test-logo' alt='Solid logo' />
                    </div>
                    <div>
                        <a class='test-a-solid' href='https://www.solidjs.com' target='_blank' rel='noopener'>
                            Solid
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
