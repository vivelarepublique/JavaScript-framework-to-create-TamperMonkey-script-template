import type { CssRuleObject, CssRuleObjectArrayBasic, CssRuleObjectArray } from '../interfaces';

export function splitRule(rule: string): CssRuleObject {
    const ruleArray = rule.split('{');
    const s = ruleArray.shift();
    const c = ruleArray.join('{');

    const selector = s?.trim() || '';
    const content = c?.trim() || '';
    return { selector, content };
}

function splitRuleBasic(rule: string): CssRuleObjectArrayBasic {
    const { selector, content } = splitRule(rule);
    const selectors = (selector?.trim() || '').split(',').filter(s => s.trim() && s.length > 1);
    const contents = (content?.trim() || '').split(';').filter(c => c.trim() && c.length > 1);
    return { selectors, contents };
}

export function splitRuleToArray(rule: string): CssRuleObjectArray {
    const { selector, content } = splitRule(rule);

    if (selector.includes('@media') || selector.includes('@container')) {
        const sub = content.split('}').filter(c => c.trim() && c.length > 1);
        return { selectors: [selector], contents: sub.map(s => splitRuleBasic(s)) };
    } else {
        return splitRuleBasic(rule);
    }
}

export function splitCssToArray(cssContent: string, sortByOrder: boolean = false): string[] {
    if (!cssContent.trim()) return [];

    const cssArray = cssContent.split('}');
    const cssResult: string[] = [];

    const tempArray: string[] = [];
    let finishFlag = true;

    for (let r = 0; r < cssArray.length; r++) {
        const rule = cssArray[r].trim();
        if (rule.includes('@')) {
            finishFlag = false;
            tempArray.push(`${rule}}`);
        } else if (!rule && tempArray.length > 0) {
            finishFlag = true;
            cssResult.push(`${tempArray.join('')}}`);
            tempArray.length = 0;
        } else {
            finishFlag ? cssResult.push(`${rule}}`) : tempArray.push(`${rule}}`);
        }
    }
    return sortByOrder ? cssResult.sort() : cssResult;
}
