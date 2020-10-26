module.exports = {
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "rules": {
    "indent": ["error", 2],
    "comma-dangle": [2, "never"],
    "linebreak-style": ["error", "unix"],
    "no-cond-assign": ["error", "always"],
    "no-console": 2,
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "array-bracket-spacing": 2,
    "block-spacing": 2,
    "padded-blocks": [2, "never"],
    "prefer-const": 2,
    "prefer-arrow-callback": 2,
    "sort-imports": 2,
  },
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
};
