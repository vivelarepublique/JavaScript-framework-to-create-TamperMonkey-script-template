import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function colorMixin(path) {
    const array = readdirSync(path)
        .map(file => {
            const content = readFileSync(join(path, file), 'utf-8');
            const colors = content.match(/#[a-fA-F0-9]{6}/g);

            if (!colors || colors.length === 0) {
                return { name: file.replace(/\.svg/g, ''), value: '#000000' };
            }

            if (colors.length === 1) {
                return { name: file.replace(/\.svg/g, ''), value: DiminishDarkOrBlight(colors[0]).toLowerCase() };
            }

            if (colors.length <= 4) {
                const mostFrequentColor = findMostFrequent(colors);
                if (mostFrequentColor) {
                    return { name: file.replace(/\.svg/g, ''), value: DiminishDarkOrBlight(mostFrequentColor).toLowerCase() };
                }

                const hex = calculateAverage(colors);
                return { name: file.replace(/\.svg/g, ''), value: DiminishDarkOrBlight(hex).toLowerCase() };
            }
            const hex = calculateWeightedAverage(colors);
            return { name: file.replace(/\.svg/g, ''), value: DiminishDarkOrBlight(hex).toLowerCase() };
        })
        .filter(item => item.name && item.value);
    console.log(array);

    const colorArray = array.map(item => '\t' + `--ft-color-${item.name}: ${item.value};\n`);
    const backgroundColorArray = array.map(item => '\t' + `--ft-background-color-${item.name}: ${backgroundColor(item.value)};\n`);
    const borderColorArray = array.map(item => '\t' + `--ft-border-color-${item.name}: ${borderColor(item.value)};\n`);
    const shadowColorArray = array.map(item => '\t' + `--ft-shadow-color-${item.name}: ${shadowColor(item.value)};\n`);

    const result = [...colorArray, ...backgroundColorArray, ...borderColorArray, ...shadowColorArray].join('');
    writeFileSync('other/result.css', ':root {\n' + result + '}\n', 'utf-8');
}

function hexToObject(hex) {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return { r, g, b };
}

function objectToHex({ r, g, b }) {
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function toHex(value) {
    return value.toString(16).padStart(2, '0');
}

function backgroundColor(hex) {
    const { r, g, b } = hexToObject(hex);

    const red = r > 42 ? r - 21 : r;
    const green = g > 42 ? g - 21 : g;
    const blue = b > 42 ? b - 21 : b;

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function borderColor(hex) {
    const { r, g, b } = hexToObject(hex);

    const red = r > 67 ? r - 42 : r > 42 ? r - 21 : r;
    const green = g > 67 ? g - 42 : g > 42 ? g - 21 : g;
    const blue = b > 67 ? b - 42 : b > 42 ? b - 21 : b;

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function shadowColor(hex) {
    const { r, g, b } = hexToObject(hex);

    const red = r < 210 ? r + 21 : r;
    const green = g < 210 ? g + 21 : g;
    const blue = b < 210 ? b + 21 : b;

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}84`;
}

function DiminishDarkOrBlight(hex) {
    const { r, g, b } = hexToObject(hex);

    const red = r === 255 ? r - 21 : r === 0 ? r + 21 : r;
    const green = g === 255 ? g - 21 : g === 0 ? g + 21 : g;
    const blue = b === 255 ? b - 21 : b === 0 ? b + 21 : b;

    return `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
}

function calculateAverage(arr) {
    if (arr.length === 0) return objectToHex({ r: 0, g: 0, b: 0 });

    const objectArr = arr.map(hex => hexToObject(hex));
    const total = objectArr.length;

    const redSum = objectArr.reduce((accumulator, current) => accumulator + current.r, 0);
    const greenSum = objectArr.reduce((accumulator, current) => accumulator + current.g, 0);
    const blueSum = objectArr.reduce((accumulator, current) => accumulator + current.b, 0);

    return objectToHex({ r: Math.round(redSum / total), g: Math.round(greenSum / total), b: Math.round(blueSum / total) });
}

function calculateWeightedAverage(arr) {
    if (arr.length === 0) return objectToHex({ r: 0, g: 0, b: 0 });
    const map = statisticalFrequency(arr);

    let total = 0;
    let redSum = 0;
    let greenSum = 0;
    let blueSum = 0;
    console.log(map.entries());

    for (const [key, value] of map.entries()) {
        const { r, g, b } = hexToObject(key);
        redSum += r * value;
        greenSum += g * value;
        blueSum += b * value;
        total += value;
    }

    return objectToHex({ r: Math.round(redSum / total), g: Math.round(greenSum / total), b: Math.round(blueSum / total) });
}

function statisticalFrequency(arr) {
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

    return map;
}

function findMostFrequent(arr) {
    if (arr.length === 0) return null;

    const map = statisticalFrequency(arr);

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
