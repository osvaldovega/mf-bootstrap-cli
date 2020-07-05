module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: false,
        targets: {
          browsers: ["last 2 versions"],
        },
        debug: false,
        // useBuiltIns: "usage",
        corejs: 3,
      },
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
  ],
};
