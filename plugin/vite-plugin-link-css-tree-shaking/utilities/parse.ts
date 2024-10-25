import fs from 'node:fs';
import { XMLParser } from 'fast-xml-parser';
import { isURL } from './judgement';
import { readLocalFile, readRemoteResource } from './preprocess';
import { createCache, getCache, existsCache, pickupCacheName } from './cache';
import type { HTMLStructure } from '../interfaces';

export async function parseIndexHTML(): Promise<string> {
    const html = fs.readFileSync('index.html', 'utf8');
    const options = {
        attributeNamePrefix: '__',
        ignoreAttributes: false,
        unpairedTags: ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'],
        stopNodes: ['*.pre', '*.script'],
        processEntities: true,
        htmlEntities: true,
    };

    const parser = new XMLParser(options);
    const data = parser.parse(html) as HTMLStructure;

    const link = data.html.head.link;
    if (!link) return '';

    if (Array.isArray(link)) {
        const href = link.map(l => l.__href);
        const contentArray: string[] = [];
        for (const h of href) {
            if (isURL(h)) {
                const fileName = pickupCacheName(h);
                if (!fileName) continue;

                if (existsCache(fileName)) {
                    contentArray.push(getCache(fileName));
                } else {
                    console.log(`The css file:${fileName} is for the first build and may take longer.`);
                    const data = await readRemoteResource(h);
                    createCache(fileName, data);
                    contentArray.push(data);
                }
            } else {
                contentArray.push(readLocalFile(h));
            }
        }

        return contentArray.reduce((previous, current) => previous + current, '');
    } else {
        const href = link.__href;
        if (isURL(href)) {
            const fileName = pickupCacheName(href);
            if (!fileName) return '';

            if (existsCache(fileName)) {
                return getCache(fileName);
            } else {
                console.log(`The css file:${fileName} is for the first build and may take longer.`);
                const data = await readRemoteResource(href);
                createCache(fileName, data);
                return data;
            }
        } else {
            return readLocalFile(href);
        }
    }
}
