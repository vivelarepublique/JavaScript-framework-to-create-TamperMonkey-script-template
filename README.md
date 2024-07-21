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

- [Vue](https://github.com/vuejs/vue) and [Pinia](https://github.com/vuejs/pinia)
- [React](https://github.com/facebook/react) and [Redux](https://github.com/reduxjs/redux)
- [Preact](https://github.com/preactjs/preact)
- [Lit](https://github.com/lit/lit)
- [Svelte](https://github.com/sveltejs/svelte)
- [Solid](https://github.com/solidjs/solid)

## Building Tool

- [Vite](https://github.com/vitejs/vite)
- [Webpack](https://github.com/webpack/webpack) ([deprecated](https://github.com/vivelarepublique/vue-or-react-create-tampermonkey-script-template/blob/main/legacy/legacy%20support.md))

## Usage

```bash
git clone https://github.com/vivelarepublique/vue-or-react-create-tampermonkey-script-template
cd vue-or-react-create-tampermonkey-script-template
npm install
npm run dev
```

## Future plans

- [ ] More framework support
  - [Angular](https://github.com/angular/angular)
  - [Astro](https://github.com/withastro/astro)
- [ ] More packaged native JavaScript function
- [ ] More detailed documentation

## License

MIT

## Author

[vivelarepublique](https://github.com/vivelarepublique)

<!-- ## Contributing

Contributions are welcome! Please read the [contribution guidelines](https://github.com/vivelarepublique/vue-or-react-create-tampermonkey-script-template/blob/main/CONTRIBUTING.md) first

## Show your support

Give a ⭐️ if you like this project! -->