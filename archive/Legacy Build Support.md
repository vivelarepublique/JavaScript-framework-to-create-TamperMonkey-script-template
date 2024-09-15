# Need to use [Webpack](https://webpack.js.org/) instead of [Vite](https://vitejs.dev/)?

### Use the following steps to configure your project to use Webpack instead of Vite

1. **Install Webpack and its dependencies**

```bash
npm install webpack webpack-cli webpack-dev-server -D
```

2. **Install resource loaders**

```bash
npm install ts-loader css-loader style-loader url-loader -D
```

##### For Vue, you also need

```bash
npm install vue-loader -D
```

##### For the CSS preprocessor, you also need(**_choose as needed_**)

```bash
npm install less-loader -D
npm install sass-loader -D
npm install stylus-loader -D
```

3. **Install Webpack plugin**

```bash
npm install html-webpack-plugin terser-webpack-plugin -D
```

4. **Rename and move files**

##### **_Rename and move_** the following files from the current directory to the root directory

```txt
webpack.config.mjs.txt -> webpack.config.mjs
webpack.dev.mjs.txt -> webpack.dev.mjs
```

5. **Modify the contents of `package.json`**

```json
    "scripts": {
        "dev": "webpack serve -c webpack.dev.mjs",
        "build": "webpack -c webpack.config.mjs"
    },
```

### Note

Using Webpack only supports packaging `Vue` or `React` projects, and theoretically `svelte`, but I didn't experiment with that.

### Known issues

1. When using the `<style scoped>` keyword in .vue file, webpack will throw an “**Error: TS7006: Parameter ‘n’ implicitly has an ‘any’ type**” error. For detailed information, please check: [Scoped style leads to error: TS7006: Parameter 'n' implicitly has an 'any' type #1915](https://github.com/vuejs/vue-loader/issues/1915)
