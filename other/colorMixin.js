import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function colorMixin(path) {
    const array = [];
    readdirSync(path).forEach(file => {
        const content = readFileSync(join(path, file), 'utf-8');
        const colors = content.match(/#[a-fA-F0-9]{6}/g);

        if (colors && colors.length > 0) {
            if (colors.length === 1) {
                array.push({ name: file, value: colors[0].toLowerCase() });
                console.log(`${file}: ${colors[0].toLowerCase()}`);
            } else {
                const mostFrequentColor = findMostFrequent(colors);

                if (mostFrequentColor) {
                    array.push({ name: file, value: mostFrequentColor.toLowerCase() });
                    console.log(`${file}: ${mostFrequentColor.toLowerCase()}`);
                } else {
                    const rgbArray = colors.map(color => hexToRgb(color));
                    const redAverage = Math.round(rgbArray.reduce((acc, color) => acc + color.r, 0) / rgbArray.length);
                    const greenAverage = Math.round(rgbArray.reduce((acc, color) => acc + color.g, 0) / rgbArray.length);
                    const blueAverage = Math.round(rgbArray.reduce((acc, color) => acc + color.b, 0) / rgbArray.length);
                    const hex = rgbToHex({ r: redAverage, g: greenAverage, b: blueAverage });

                    array.push({ name: file, value: hex.toLowerCase() });
                    console.log(`${file}: ${hex}`);
                }
            }
        }
    });

    const colorArray = array.map(item => '\t' + `--ft-color-${item.name.replace(/\.svg/g, '')}: ${item.value};\n`);
    const backgroundColorArray = array.map(item => '\t' + `--ft-background-color-${item.name.replace(/\.svg/g, '')}: ${backgroundColor(item.value)};\n`);
    const borderColorArray = array.map(item => '\t' + `--ft-border-color-${item.name.replace(/\.svg/g, '')}: ${borderColor(item.value)};\n`);
    const shadowColorArray = array.map(item => '\t' + `--ft-shadow-color-${item.name.replace(/\.svg/g, '')}: ${shadowColor(item.value)};\n`);

    const result = [...colorArray, ...backgroundColorArray, ...borderColorArray, ...shadowColorArray].join('');
    writeFileSync('other/colorMixinResult.css', ':root {\n' + result.replace(/\.svg/g, '') + '}\n', 'utf-8');
}

function hexToRgb(hex) {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return { r, g, b };
}

function rgbToHex({ r, g, b }) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function toHex(value) {
    return value.toString(16).padStart(2, '0');
}

function backgroundColor(hex) {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const red = r > 21 ? r - 21 : r;
    const green = g > 21 ? g - 21 : g;
    const blue = b > 21 ? b - 21 : b;

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function borderColor(hex) {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const red = r > 42 ? r - 42 : r > 21 ? r - 21 : r;
    const green = g > 42 ? g - 42 : g > 21 ? g - 21 : g;
    const blue = b > 42 ? b - 42 : b > 21 ? b - 21 : b;

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function shadowColor(hex) {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    const red = r < 233 ? r + 21 : r;
    const green = g < 233 ? g + 21 : g;
    const blue = b < 233 ? b + 21 : b;

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}80`;
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
