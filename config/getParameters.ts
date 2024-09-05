import parameters from './parameters.json';
import { Parameters } from '../types';

export const bannerConfig: Parameters = {
    name: parameters.name || 'New Test TamperMonkey Script',
    namespace: parameters.namespace || '',
    description: parameters.description || '',
    author: parameters.author || '',
    matchUrl: parameters.matchUrl || [],
    runtime: parameters.runtime || '',
    grant: parameters.grant || [],
    connect: parameters.connect || [],
};
