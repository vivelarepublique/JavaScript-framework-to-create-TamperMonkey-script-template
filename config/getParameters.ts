import YAML from 'yaml';
import fs from 'node:fs';
import type { ScriptInformationParameters } from '../types';

const bannerFile = fs.readFileSync('./config/banner.yaml', 'utf8');
const banner = YAML.parse(bannerFile);

const { name, namespace, version, description, author, match, runAt, runIn, sandbox, tag, noframes, grant, connect } = banner;

export const bannerConfig: ScriptInformationParameters = {
    name: name || 'New-UserScript',
    namespace: namespace || 'http://tampermonkey.net/',
    version: version || '',
    description: description || 'try to take over the world!',
    author: author || 'You',
    match: match || ['*://*/*'],
    runAt: runAt || 'document-idle',
    runIn,
    sandbox,
    tag: tag || [],
    noframes: noframes || false,
    grant: grant || ['none'],
    connect: connect || [],
};
