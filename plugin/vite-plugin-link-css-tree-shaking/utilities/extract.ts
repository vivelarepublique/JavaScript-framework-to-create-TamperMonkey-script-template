import { removeDuplicates } from './common';
import { simplifySelector } from './replace';
import { cssSelectorFilter } from './filter';
import { splitRule } from './split';

export function extractCssOnDemand(cssContent: string[], tagArray: string[], classArray: string[]): string[] {
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

export function extractFileContentTagName(filesData: string[], excludeTags: string[] = []): string[] {
    const tags = filesData.reduce((previous: string[], current: string) => {
        return previous.concat(current.match(/(?<=<)[a-z0-9]+(?=\s|(?=>))/g) || []);
    }, []);
    return removeDuplicates(tags).filter(t => !excludeTags.includes(t));
}

export function extractFileContentClassName(filesData: string[], excludeClassNameKeywords: string = 'exclude-class-keywords'): string[] {
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
