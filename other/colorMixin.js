import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function colorMixin(path) {
    let result = '';
    readdirSync(path).forEach(file => {
        const content = readFileSync(join(path, file), 'utf-8');
        const colors = content.match(/#[a-fA-F0-9]{6}/g);

        if (colors && colors.length > 0) {
            if (colors.length === 1) {
                result += `${file}: ${colors[0].toLowerCase()}\n`;
                console.log(`${file}: ${colors[0].toLowerCase()}`);
            } else {
                const mostFrequentColor = findMostFrequent(colors);

                if (mostFrequentColor) {
                    result += `${file}: ${mostFrequentColor.toLowerCase()}\n`;
                    console.log(`${file}: ${mostFrequentColor.toLowerCase()}`);
                } else {
                    const rgbArray = colors.map(color => hexToRgb(color));
                    const redAverage = Math.round(rgbArray.reduce((acc, color) => acc + color.r, 0) / rgbArray.length);
                    const greenAverage = Math.round(rgbArray.reduce((acc, color) => acc + color.g, 0) / rgbArray.length);
                    const blueAverage = Math.round(rgbArray.reduce((acc, color) => acc + color.b, 0) / rgbArray.length);
                    const hex = rgbToHex({ r: redAverage, g: greenAverage, b: blueAverage });

                    result += `${file}: ${hex}\n`;
                    console.log(`${file}: ${hex}`);
                }
            }
        }

        writeFileSync('other/colorMixinResult.txt', result, 'utf-8');
    });
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return { r, g, b };
}

function rgbToHex({ r, g, b }) {
    const toHex = value => value.toString(16).padStart(2, '0');
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function findMostFrequent(arr) {
    if (arr.length === 0) return null;

    const map = new Map();
    arr.reduce((accumulator, current) => {
        if (accumulator.includes(current)) {
            map.set(current, map.get(current) + 1);
            return accumulator;
        } else {
            map.set(current, 1);
            return accumulator.concat(current);
        }
    }, []);

    let max = 1;
    let maxKey = '';
    let tempKey = '';

    for (const [key, value] of map.entries()) {
        if (value > max) {
            maxKey = key;
            max = value;
        }
        if (value === max && value > 1) {
            tempKey = key;
        }
    }

    if (tempKey !== maxKey) {
        return null;
    }
    if (max === 1) {
        return null;
    }
    return maxKey;
}

colorMixin('src/assets/svg');
