import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export function cssSplitAndReorganize(cssContent: string, sortByOrder: boolean = false): string[] {
    const cssArray = cssContent.split('}');
    const cssResult: string[] = [];

    const tempArray: string[] = [];
    let finishFlag = true;
    for (let i = 0; i < cssArray.length; i++) {
        if (cssArray[i].includes('@')) {
            finishFlag = false;
            tempArray.push(cssArray[i] + '}');
        } else if (cssArray[i].trim() === '') {
            finishFlag = true;
            cssResult.push(tempArray.join('') + '}');
            tempArray.length = 0;
        } else {
            finishFlag ? cssResult.push(cssArray[i] + '}') : tempArray.push(cssArray[i] + '}');
        }
    }
    return sortByOrder ? cssResult.sort() : cssResult;
}

function externalCssTransformation(cssPath: string): string[] {
    try {
        const file = readFileSync(cssPath, 'utf-8');
        const css = file.replaceAll(/(@charset "UTF-8";)|(\/\*[\s\S]*?\*\/)/g, '');
        return cssSplitAndReorganize(css);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function extractCssOnDemand(path: string, tags: string[], classes: string[], excludeClassNameKeywords: string = 'framework-test'): string[] {
    const minResult: string[] = [];
    const allCss = externalCssTransformation(path);
    allCss.forEach(rule => {
        const css = rule.split('{');
        const selector = css[0].trim();
        if (selector === 'body' || selector.includes(':root')) {
            minResult.push(rule);
        } else {
            tags.forEach(tag => {
                if (selector.includes(',')) {
                    const selectors = selector.split(',').map(s => s.trim());
                    if (selectors.includes(tag)) {
                        minResult.push(rule);
                    }
                } else {
                    const selectors = selector
                        .split(' ')
                        .map(s => s.trim())
                        .filter(s => s);
                    if (selectors.includes(tag)) {
                        minResult.push(rule);
                    }
                }
            });
            classes
                .filter(name => !name.includes(excludeClassNameKeywords))
                .forEach(className => {
                    const selectors = selector
                        .replaceAll(/[:\+\>\*\.]|\[.*?\]/g, '')
                        .split(',')
                        .map(s => s.trim());
                    if (selectors.every(s => className.includes(s))) {
                        minResult.push(rule);
                    }
                });
        }
    });
    return [...new Set(minResult)];
}

export function componentsAnalysis(paths: string[]): string[] {
    const result: string[] = [];
    try {
        paths
            .map(framework => `src/${framework}/components`)
            .forEach(path => {
                const files = readdirSync(path);
                files.forEach(file => {
                    if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.vue') || file.endsWith('.svelte')) {
                        const filePath = join(path, file);
                        const data = readFileSync(filePath, 'utf-8');
                        result.push(data);
                    }
                });
            });
    } catch (error) {
        console.log(error);
    } finally {
        return result;
    }
}

export function extractFileContentTagName(filesData: string[]): string[] {
    return [
        ...new Set(
            filesData.reduce((accumulator: string[], current: string) => {
                return accumulator.concat(current.match(/(?<=<)[a-z0-9]+(?=\s|(?=>))/g) || []);
            }, []),
        ),
    ];
}

export function extractFileContentClassName(filesData: string[]): string[] {
    return [
        ...new Set(
            filesData.reduce((accumulator: string[], current: string) => {
                return accumulator.concat((current.match(/(?<=\sclassN?a?m?e?=['"])[a-z0-9\-\s]+?(?=['"])/g) || []).map(e => e.split(' ')).flat());
            }, []),
        ),
    ].filter(e => e && e.length > 1);
}
