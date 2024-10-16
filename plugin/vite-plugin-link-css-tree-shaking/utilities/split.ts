export function splitRule(rule: string): { selector: string; content: string } {
    const css = rule.split('{');
    const selector = css[0]?.trim() || '';
    const content = css[1]?.trim() || '';
    return { selector, content };
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
