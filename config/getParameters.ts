import YAML from 'yaml';
import fs from 'node:fs';
import pkg from '../package.json';
import type { ScriptInformationParameters } from '../plugin/vite-plugin-tampermonkey-banner-addition-and-css-injection/interfaces';

const bannerFile = fs.readFileSync('./config/banner.yaml', 'utf8');
const banner = YAML.parse(bannerFile);
const { name, namespace, version, description, author, match, runAt, runIn, sandbox, tag, noframes, grant, connect } = banner as ScriptInformationParameters;
export const bannerConfig: ScriptInformationParameters = {
    name: pkg.name || name || 'New-UserScript',
    namespace: namespace || 'http://tampermonkey.net/',
    version: (pkg.version && /[1-9]/.test(pkg.version) ? pkg.version : version) || '',
    description: pkg.description || description || 'try to take over the world!',
    author: pkg.author || author || 'You',
    match: match || ['*://*/*'],
    runAt: runAt || 'document-idle',
    runIn,
    sandbox,
    tag,
    noframes,
    grant,
    connect,
};

const frameworkFile = fs.readFileSync('./config/framework.yaml', 'utf8');
const framework = YAML.parse(frameworkFile);
export const { supportedFramework } = framework as { supportedFramework: string[] };
