module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react"],
  extends: ["airbnb", "prettier", "prettier/react"],
  rules: {
    "no-console": "off",
    "react/sort-comp": "off",
    "no-nested-ternary": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/jsx-filename-extension": [0],
    "no-plusplus": "off",
    "react/prefer-stateless-function": [0],
    "react/destructuring-assignment": [0],
    "import/no-cycle": "off",
    "import/prefer-default-export": "off",
    "import/no-unresolved": [2, { caseSensitive: false }],
    "react/jsx-props-no-spreading": [0],
  },
};
