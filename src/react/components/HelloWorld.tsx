import React from 'react';

interface Props {
    msg: string;
}

export default function HelloWorld(props: Props) {
    const { msg } = props;
    return (
        <React.Fragment>
            <div>
                <h1>{msg}</h1>
                <h3 className='react-test-class'>React Test Page</h3>
                <ul className='react-test-class'>
                    <li>
                        <a className='react-test-class-vue' href='https://vuejs.org' target='_blank' rel='noopener'>
                            Vue
                        </a>
                    </li>
                    <li>
                        <a className='react-test-class-pinia' href='https://pinia.vuejs.org' target='_blank' rel='noopener'>
                            Pinia
                        </a>
                    </li>
                    <li>
                        <a className='react-test-class-react' href='https://react.dev' target='_blank' rel='noopener'>
                            React
                        </a>
                    </li>
                    <li>
                        <a className='react-test-class-redux' href='https://redux.js.org' target='_blank' rel='noopener'>
                            Redux
                        </a>
                    </li>
                    <li>
                        <a className='react-test-class-less' href='https://lesscss.org' target='_blank' rel='noopener'>
                            Less
                        </a>
                    </li>
                    <li>
                        <a className='react-test-class-sass' href='https://sass-lang.com' target='_blank' rel='noopener'>
                            Sass
                        </a>
                    </li>
                    <li>
                        <a className='react-test-class-stylus' href='https://stylus-lang.com' target='_blank' rel='noopener'>
                            Stylus
                        </a>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    );
}
