import fs from 'node:fs';
import path from 'node:path';
import { isComponentsFile } from './judgement';
import { splitCssToArray, splitCssFile } from './split';
import { extractFileContentClassName, extractFileContentTagName } from './extract';
import { filterCssUsed } from './filter';
import { readLocalFile } from './preprocess';
import { parseIndexHTML } from './parse';
import type { TreeShakingOptions, CssRuleObjectArray } from '../interfaces';

export { splitCssToArray };
export { removeDuplicates } from './common';

export default async function treeShaking(option: TreeShakingOptions): Promise<string[]> {
    const { manualEntry, componentsFilesPath, excludeTags, excludeClassNameKeywords } = option;
    const cssArray = manualEntry ? manualHandlingCssFiles(manualEntry) : splitCssFile(await parseIndexHTML());
    const componentsArray = componentsAnalysis(componentsFilesPath || 'src/components');

    return filterCssUsed(cssArray, {
        tags: extractFileContentTagName(componentsArray, excludeTags),
        classes: extractFileContentClassName(componentsArray, excludeClassNameKeywords),
    });
}

function manualHandlingCssFiles(filePath: string | string[]): CssRuleObjectArray[] {
    const content = readLocalFile(filePath);
    return splitCssFile(content);
}

function componentsAnalysis(frameworkPath: string | string[]): string[] {
    if (Array.isArray(frameworkPath)) {
        return frameworkPath.reduce((previous, current) => {
            if (!fs.existsSync(current)) return previous;
            const files = fs.readdirSync(current);
            return previous.concat(
                files.reduce((prev, curr) => {
                    if (!isComponentsFile(curr)) return prev;
                    return prev.concat(fs.readFileSync(path.join(current, curr), 'utf-8'));
                }, [] as string[]),
            );
        }, [] as string[]);
    } else {
        if (!fs.existsSync(frameworkPath)) return [];
        const files = fs.readdirSync(frameworkPath);
        return files.reduce((prev, curr) => {
            if (!isComponentsFile(curr)) return prev;
            return prev.concat(fs.readFileSync(path.join(frameworkPath, curr), 'utf-8'));
        }, [] as string[]);
    }
}
