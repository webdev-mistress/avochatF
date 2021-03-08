'use strict';

module.exports = {
  bracketSpacing: false,
  singleQuote: true,
  jsxBracketSameLine: true,
  trailingComma: 'es5',
  printWidth: 90,
  parser: 'babel',

  overrides: [
    {
      options: {
        trailingComma: 'all',
      },
    },
  ],
};
