import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { removeDuplicates } from './common';
import { isMinCssAndExists, isComponentsFile } from './judgement';
import { removeCommentsAndCharset, simplifySelector } from './replace';
import { cssSelectorFilter } from './filter';
import { splitRule, splitCssToArray } from './split';
import type { TreeShakingOptions } from '../interfaces';

export { splitCssToArray };

export default function treeShaking(option: TreeShakingOptions): string[] {
    const { cssFilesPath, frameworkComponentsPath, excludeTags, excludeClassNameKeywords } = option;
    const cssArray = handlingCssFiles(cssFilesPath);
    const componentsArray = componentsAnalysis(frameworkComponentsPath);

    return extractCssOnDemand(cssArray, extractFileContentTagName(componentsArray, excludeTags), extractFileContentClassName(componentsArray, excludeClassNameKeywords));
}

function handlingCssFiles(filePath: string | string[]): string[] {
    const content = readCssFileAndPreprocess(filePath);
    return splitCssToArray(content);
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

function componentsAnalysis(frameworkPath: string | string[]): string[] {
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

function extractCssOnDemand(cssContent: string[], tagArray: string[], classArray: string[]): string[] {
    const minResult = cssContent.filter(rule => {
        if (rule.length <= 1) return false;

        const { selector, content } = splitRule(rule);

        if (selector === 'html' || selector === 'body' || selector === ':root' || selector.includes('*') || selector.includes('@keyframes')) {
            return true;
        } else {
            if (selector.includes('@media') || selector.includes('@container')) {
                return !!classArray.find((className, _, self) => {
                    const subSelector = simplifySelector(content.replaceAll(/{.+?}/g, ' ').replace('}', ''));
                    return cssSelectorFilter(subSelector, className, self, tagArray);
                });
            } else {
                const simpleSelector = simplifySelector(selector);
                return (
                    !!tagArray.find(tag => {
                        return !simpleSelector.includes('.') && simpleSelector.replaceAll(',', ' ').split(' ').includes(tag);
                    }) ||
                    !!classArray.find((className, _, self) => {
                        return simpleSelector.includes('.') && cssSelectorFilter(simpleSelector, className, self, tagArray);
                    })
                );
            }
        }
    });

    return removeDuplicates(minResult);
}

function extractFileContentTagName(filesData: string[], excludeTags: string[] = []): string[] {
    const tags = filesData.reduce((previous: string[], current: string) => {
        return previous.concat(current.match(/(?<=<)[a-z0-9]+(?=\s|(?=>))/g) || []);
    }, []);
    return removeDuplicates(tags).filter(t => !excludeTags.includes(t));
}

function extractFileContentClassName(filesData: string[], excludeClassNameKeywords: string = 'exclude-class-keywords'): string[] {
    const nativeClasses = filesData.reduce((previous: string[], current: string) => {
        return previous.concat((current.match(/(?<=\sclassN?a?m?e?=['"])[a-z0-9\-\s]+?(?=['"])/g) || []).map(c => c.split(' ')).flat());
    }, []);

    const vueClasses = filesData.reduce((previous: string[], current: string) => {
        const vueClassContent = current.match(/(?<=:classN?a?m?e?="\{).*?(?=\}")/g) || [];
        if (vueClassContent.length === 0) return previous;

        return previous.concat(removeDuplicates(vueClassContent.map(v => v.match(/(?<=')[a-z0-9-]+(?=')/g) || []).flat()));
    }, []);

    const jsxClasses = filesData.reduce((previous: string[], current: string) => {
        const jsxClassContent = current.match(/(?<=classN?a?m?e?=\$?\{).*?(?=\})/g) || [];
        if (jsxClassContent.length === 0) return previous;

        return previous.concat(
            removeDuplicates(
                jsxClassContent
                    .map(j => j.match(/(?<=')[a-z0-9-\s]+(?=')/g) || [])
                    .flat()
                    .map(k => k.split(' '))
                    .flat(),
            ),
        );
    }, []);

    const AllClasses = [...nativeClasses, ...vueClasses, ...jsxClasses];

    return removeDuplicates(AllClasses).filter(c => c && c.length > 1 && !c.includes(excludeClassNameKeywords));
}
