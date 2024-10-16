export function cssSelectorFilter(content: string, selector: string, classes: string[], tags: string[]): boolean {
    return content
        .split(',')
        .filter(j => j.includes('.'))
        .some(k =>
            k.split(' ').every(
                l =>
                    l === `.${selector}` ||
                    tags.includes(l) ||
                    l
                        .split('.')
                        .filter(m => m)
                        .every(n => classes.includes(n)),
            ),
        );
}
