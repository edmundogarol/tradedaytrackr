module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "defaults",
      },
    ],
    [
      "@babel/preset-react",
      {
        runtime: "automatic",
      },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    [
      "babel-plugin-styled-components",
      {
        displayName: true,
        fileName: true,
      },
    ],
    // Without this, Babel inlines a fresh local `_optionalChain` (etc.)
    // helper function into every file that uses optional chaining. Under
    // certain module-scoping situations that duplication can go missing at
    // runtime, throwing "_optionalChain is not defined". transform-runtime
    // instead imports one shared helper from @babel/runtime everywhere.
    [
      "@babel/plugin-transform-runtime",
      {
        helpers: true,
        regenerator: true,
      },
    ],
  ],
};
