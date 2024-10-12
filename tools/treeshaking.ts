import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { removeDuplicates } from './utils';

export function handlingCssFiles(filePath: string | string[]): string[] {
    const content = readCssFileAndPreprocess(filePath);
    return cssSplitAndReorganize(content);
}

export function cssSplitAndReorganize(cssContent: string, sortByOrder: boolean = false): string[] {
    const cssArray = cssContent.split('}');
    const cssResult: string[] = [];

    const tempArray: string[] = [];
    let finishFlag = true;
    for (const rule of cssArray) {
        if (rule.includes('@')) {
            finishFlag = false;
            tempArray.push(`${rule}}`);
        } else if (rule.trim() === '') {
            finishFlag = true;
            cssResult.push(`${tempArray.join('')}}`);
            tempArray.length = 0;
        } else {
            finishFlag ? cssResult.push(`${rule}}`) : tempArray.push(`${rule}}`);
        }
    }
    return sortByOrder ? cssResult.filter(c => c.length > 1).sort() : cssResult.filter(c => c.length > 1);
}

function readCssFileAndPreprocess(filePath: string | string[]): string {
    if (Array.isArray(filePath)) {
        return filePath.reduce((previous, current) => {
            if (!isMinCssAndExists(current)) return previous;
            const content = readFileSync(current, 'utf-8');
            return previous + removeCommentsAndCharset(content);
        }, '');
    } else {
        if (!isMinCssAndExists(filePath)) return '';
        const content = readFileSync(filePath, 'utf-8');
        return removeCommentsAndCharset(content);
    }
}

function isMinCssAndExists(filePath: string): boolean {
    return filePath.endsWith('.min.css') && existsSync(filePath);
}

function removeCommentsAndCharset(content: string): string {
    return content.replaceAll(/(@charset "UTF-8";)|(\/\*[\s\S]*?\*\/)/g, '');
}

function isComponentsFile(file: string): boolean {
    return file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.vue') || file.endsWith('.svelte');
}

export function componentsAnalysis(frameworkPath: string | string[]): string[] {
    if (Array.isArray(frameworkPath)) {
        return frameworkPath.reduce((previous, current) => {
            if (!existsSync(current)) return previous;
            const files = readdirSync(current);
            return previous.concat(
                files.reduce((prev, curr) => {
                    if (!isComponentsFile(curr)) return prev;
                    return prev.concat(readFileSync(join(current, curr), 'utf-8'));
                }, [] as string[]),
            );
        }, [] as string[]);
    } else {
        if (!existsSync(frameworkPath)) return [];
        const files = readdirSync(frameworkPath);
        return files.reduce((prev, curr) => {
            if (!isComponentsFile(curr)) return prev;
            return prev.concat(readFileSync(join(frameworkPath, curr), 'utf-8'));
        }, [] as string[]);
    }
}

export function extractCssOnDemand(cssContent: string[], tagArray: string[], classArray: string[]): string[] {
    const minResult = cssContent.filter(rule => {
        if (rule.length <= 1) return false;

        const { selector, content } = splitRule(rule);
        if (selector === 'html' || selector === 'body' || selector === ':root' || selector.includes('*') || selector.includes('@keyframes')) {
            return true;
        } else {
            if (selector.includes('@media')) {
                return !!classArray.find(className => content.includes(className));
            } else {
                return (
                    !!tagArray.find(tag => {
                        if (selector.includes(',')) {
                            const selectors = selector.split(',').map(s => s.trim());
                            return selectors.includes(tag);
                        } else {
                            const selectors = selector
                                .split(' ')
                                .filter(s => s)
                                .map(s => s.trim());
                            return selectors.includes(tag);
                        }
                    }) ||
                    !!classArray.find(className => {
                        if (selector.includes('.')) {
                            const selectors = selector
                                .replaceAll(/[\+\>\*]|\[.*?\]|:{1,2}[a-z]+((\(.*?\)))?/g, ',')
                                .split(',')
                                .filter(s => s)
                                .map(s => s.trim());
                            return selectors.some(s => s.includes(`.${className}`));
                        } else {
                            return false;
                        }
                    })
                );
            }
        }
    });

    return removeDuplicates(minResult);
}

function splitRule(rule: string): { selector: string; content: string } {
    const css = rule.split('{');
    const selector = css[0]?.trim() || '';
    const content = css[1]?.trim() || '';
    return { selector, content };
}

export function extractFileContentTagName(filesData: string[], excludeTags: string[] = []): string[] {
    return removeDuplicates(
        filesData.reduce((accumulator: string[], current: string) => {
            return accumulator.concat(current.match(/(?<=<)[a-z0-9]+(?=\s|(?=>))/g) || []);
        }, []),
    ).filter(t => !excludeTags.includes(t));
}

export function extractFileContentClassName(filesData: string[], excludeClassNameKeywords: string = 'framework-test'): string[] {
    const nativeClasses = filesData.reduce((accumulator: string[], current: string) => {
        return accumulator.concat((current.match(/(?<=\sclassN?a?m?e?=['"])[a-z0-9\-\s]+?(?=['"])/g) || []).map(c => c.split(' ')).flat());
    }, []);

    const vueClasses = filesData.reduce((accumulator: string[], current: string) => {
        const vueClassContent = current.match(/(?<=:classN?a?m?e?="\{).*?(?=\}")/g) || [];
        if (vueClassContent.length === 0) {
            return accumulator;
        }
        return accumulator.concat(removeDuplicates(vueClassContent.map(v => v.match(/(?<=')[a-z0-9-]+(?=')/g) || []).flat()));
    }, []);

    const jsxClasses = filesData.reduce((accumulator: string[], current: string) => {
        const jsxClassContent = current.match(/(?<=classN?a?m?e?=\$?\{).*?(?=\})/g) || [];
        if (jsxClassContent.length === 0) {
            return accumulator;
        }
        return accumulator.concat(
            removeDuplicates(
                jsxClassContent
                    .map(j => j.match(/(?<=')[a-z0-9-\s]+(?=')/g) || [])
                    .flat()
                    .map(i => i.split(' '))
                    .flat(),
            ),
        );
    }, []);

    const AllClasses = [...nativeClasses, ...vueClasses, ...jsxClasses];

    return removeDuplicates(AllClasses).filter(c => c && c.length > 1 && !c.includes(excludeClassNameKeywords));
}
