import fs from 'node:fs';
import path from 'node:path';
import { isMinCssAndExists, isComponentsFile } from './judgement';
import { removeCommentsAndCharset } from './replace';
import { splitCssToArray } from './split';
import { extractCssOnDemand, extractFileContentClassName, extractFileContentTagName } from './extract';
import type { TreeShakingOptions } from '../interfaces';

export { splitCssToArray };

export default function treeShaking(option: TreeShakingOptions): string[] {
    const { manualEntry, componentsFilesPath, excludeTags, excludeClassNameKeywords } = option;
    const cssArray = handlingCssFiles(manualEntry);
    const componentsArray = componentsAnalysis(componentsFilesPath || 'src/components');

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
            const content = fs.readFileSync(current, 'utf-8');
            return previous + removeCommentsAndCharset(content);
        }, '');
    } else {
        if (!isMinCssAndExists(filePath)) return '';
        const content = fs.readFileSync(filePath, 'utf-8');
        return removeCommentsAndCharset(content);
    }
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
