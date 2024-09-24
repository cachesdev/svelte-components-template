# Svelte Components

**Generate Svelte components to use in MPAs and vanilla JS**

## Table of Contents

- Introduction
- Installation
- Usage
- Development
- Build
- Customization

## Introduction

This project provides a way of compiling individual Svelte components that can be easily integrated into your MPA or even into other frameworks. By default Tailwind CSS is installed and configured.

## Installation

To get started, clone the repository and install the dependencies:

```sh
git clone https://github.com/your-repo/svelte-components-template.git
cd svelte-components-template
npm install
```

## Usage

### Creating your own components

First, create your components under `src/`.

```svelte
// src/helloWorld.svelte
<script lang="ts">
  export let name: string = "World";
</script>

  <h1>Hello, {name}!</h1>
```

Lastly, export them in `main.js/ts`:

```js
import "./global.css";
// Exaple components: you can remove them
import DemoComponent from "./DemoComponent.svelte";
import CoolModeComponent from "./CoolModeComponent.svelte";
import helloWorld from "./helloWorld.svelte";

export { helloWorld, DemoComponent, CoolModeComponent };
```

This will make them usable under the object `svelte` as constructors when imported to your app.

### Including Components in Your Project

You can include the generated bundle in your HTML file and instantiate the components with the desired props.

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    // Import the generated CSS bundle
    <link rel="stylesheet" href="public/build/bundle.css" />
    <title>Vanilla app with Svelte Components</title>
  </head>
  <body>
    // We create dummy divs as targets
    <div id="svelte-target"></div>
    <div id="coolmode-target"></div>

    // Import the `svelte` object, which contains the constructors
    <script src="public/build/bundle.js"></script>

    // Init our components
    <script>
      const demoTarget = document.getElementById("demo-target");
      const demoProps = { data: ["Item 1", "Item 2", "Item 3"] };
      // All components are under `svelte`, this can be changed in rollup.config.js @ name
      new svelte.DemoComponent({
        target: demoTarget,
        props: demoProps,
      });

      const coolTarget = document.getElementById("cool-target");
      new svelte.CoolModeComponent({
        target: coolTarget,
      });
    </script>
  </body>
</html>
```

Once a component is mounted, Svelte provides a simple API to interact with them from outside the component:

```js
// Interact with the mounted components
// Update props
demoComponent.$set({ data: ["New Item 1", "New Item 2"] });

// Force update
demoComponent.$$.update();

// Destroy the component
coolModeComponent.$destroy();
```

It's also possible to access the interal ctx from outside, whoever you cannot change it. use this for debugging purposes.

```js
// Access the internal context of the demoComponent
console.log(demoComponent.$$.ctx);

// Example: Accessing a specific prop or state
const data = demoComponent.$$.ctx[0]; // Assuming 'data' is the first item in the context array
console.log("Data:", data);
```

### Available example Components

- **DemoComponent**: A component that displays a list of items with animations.
- **CoolModeComponent**: A component that wraps a button and creates a party effect. from Svelte Magic UI.

## Development

To start the development server and watch for changes:

```sh
npm run dev
```

This will start Rollup in watch mode and automatically rebuild the project when changes are detected. a dev server is not available, though it's possible to implement in Rollup config.

Dev mode wont minify your compiled files.

## Build

To build the project for production:

```sh
npm run build
```

This will generate the optimized bundle, minified and with sourcemaps in the public/build directory.

## Customization

As this will generate a separate bundle of CSS for Tailwind, you may have noticed that this is a problem if your main app already generates it's own CSS. the base Tailwind output will contain a copy of Preflight, which means you get a decent amount of duplicated code. if this bothers you, you can have a general configuration for Tailwind:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "../mpa/**/*.{html,js,svelte,ts}", // Adjust paths as needed
    "../svelte-components-template/src/**/*.{html,js,svelte,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Tailwind really only cares about finding classes in your files, so this approach works great and comes with the added benefit of generating the output file where you want it via the CLI and your favorite `watch` application (such as Air).
