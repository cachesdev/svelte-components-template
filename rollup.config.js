import svelte from "rollup-plugin-svelte";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import { sveltePreprocess } from "svelte-preprocess";

const production = !process.env.ROLLUP_WATCH;

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "umd",
    name: "svelte",
    file: "public/build/bundle.js",
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess(),
      include: "src/**/*.svelte",
      emitCss: true,
    }),
    postcss({
      extract: true,
      minimize: production,
      sourceMap: !production,
    }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
