# Javascript framework to create Tampermonkey script template

- A Javascript framework to create Tampermonkey script template.
- No longer need to use native JavaScript or jQuery to write Tampermonkey script.
- Use TypeScript with any framework you like.

## Native JS Content

- All runtime functions are written in [TypeScript](https://github.com/microsoft/TypeScript).
- Extended some DOM manipulation methods.
- Wraps some Tampermonkey-specific APIs.
- Some common utility functions (refer to [lodash](https://github.com/lodash/lodash)).

## Supported framework

- [Vue](https://github.com/vuejs/vue) ( Include [Pinia](https://github.com/vuejs/pinia) )
- [React](https://github.com/facebook/react) ( Include [Redux](https://github.com/reduxjs/redux) )
- [Preact](https://github.com/preactjs/preact)
- [Lit](https://github.com/lit/lit)
- [Svelte](https://github.com/sveltejs/svelte)
- [Solid](https://github.com/solidjs/solid)

## Building Tool

- [Vite](https://github.com/vitejs/vite)
- [Webpack](https://github.com/webpack/webpack)
  > Deprecated, for more information please see [this](https://github.com/vivelarepublique/JavaScript-framework-to-create-TamperMonkey-script-template/blob/main/legacy/legacy%20support.md).

## Usage

```bash
git clone https://github.com/vivelarepublique/JavaScript-framework-to-create-TamperMonkey-script-template
cd JavaScript-framework-to-create-TamperMonkey-script-template
npm install
npm run dev
```

## Future plans

- [ ] More framework support
  - [Preact](https://github.com/preactjs/preact)✅
  - [Lit](https://github.com/lit/lit)✅
  - [Svelte](https://github.com/sveltejs/svelte)✅
  - [Solid](https://github.com/solidjs/solid)✅
  - [Angular](https://github.com/angular/angular)
    > Compiling Angular projects can only be done with Angular's own compiler, not with Vite or Webpack, so combining Angular code with code from other projects can be a pain.
  - [Astro](https://github.com/withastro/astro)
    > Astro is using a self-contained build tool based on Vite, so combining Astro with code from other projects isn't simple.
- [ ] More packaged native JavaScript function
- [ ] Detailed documentation
- [ ] Performance testing and comparison

## License

MIT

## Author

[vivelarepublique](https://github.com/vivelarepublique)

<!-- ## Contributing

Contributions are welcome! Please read the [contribution guidelines](https://github.com/vivelarepublique/vue-or-react-create-tampermonkey-script-template/blob/main/CONTRIBUTING.md) first -->

## Your support

Give a ⭐️ if you like this project!
