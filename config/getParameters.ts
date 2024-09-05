import parameters from './parameters.json';
import { ScriptInformationParameters } from '../types';

export const bannerConfig: ScriptInformationParameters = {
    name: parameters.name || 'New-UserScript',
    namespace: parameters.namespace || 'http://tampermonkey.net/',
    description: parameters.description || 'try to take over the world!',
    author: parameters.author || 'You',
    matchUrl: parameters.matchUrl || ['http://*/*'],
    runtime: parameters.runtime || 'document-idle',
    grant: parameters.grant || ['none'],
    connect: parameters.connect || [],
};
