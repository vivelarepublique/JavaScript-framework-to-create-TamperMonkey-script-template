import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export function cssSplitAndReorganize(cssContent) {
    const cssArray = cssContent.split('}');
    const cssResult = [];

    const tempArray = [];
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
    return cssResult;
}

function externalCssTransformation(cssPath) {
    try {
        const file = readFileSync(cssPath, 'utf-8');
        const css = file.replaceAll(/(@charset "UTF-8";)|(\/\*[\s\S]*?\*\/)/g, '');
        return cssSplitAndReorganize(css);
    } catch (error) {
        console.log(error);
        return [];
    }
}

export function extractCssOnDemand(path, tags, classes) {
    const minResult = [];
    const allCss = externalCssTransformation(path);
    allCss.forEach(rule => {
        const css = rule.split('{');
        const selector = css[0].trim();
        if (selector === 'body' || selector.includes(':root')) {
            minResult.push(rule);
        } else {
            tags.forEach(tag => {
                if (selector === tag) {
                    minResult.push(rule);
                }
            });
            classes.forEach(className => {
                if (selector.includes(className)) {
                    minResult.push(rule);
                }
            });
        }
    });
    return minResult;
}

export function componentsAnalysis(paths) {
    const result = [];
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

export function extractFileContentTagName(filesData) {
    return [
        ...new Set(
            filesData.reduce((accumulator, current) => {
                return accumulator.concat(current.match(/(?<=<)[a-z0-9]+(?=\s|(?=>))/g));
            }, []),
        ),
    ];
}

export function extractFileContentClassName(filesData) {
    return [
        ...new Set(
            filesData.reduce((accumulator, current) => {
                return accumulator.concat(
                    current
                        .match(/(?<=\sclassN?a?m?e?=['"])[a-z0-9\-\s]+?(?=['"])/g)
                        ?.map(e => e.split(' '))
                        .flat(),
                );
            }, []),
        ),
    ].filter(e => e && e.length > 1);
}
