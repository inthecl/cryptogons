module.exports = {
  "parser": "babel-eslint",
  "env": {
      "browser": true,
      "es6": true
  },
  "extends": "airbnb-base",
  "rules": {
      // enable additional rules
      "indent": ["error", 2],
      "linebreak-style": ["error", "windows"],
      "quotes": ["error", "single"],
      "semi": ["error", "never"],

      // override default options for rules from base configurations
      "comma-dangle": ["error", "never"],
      "no-cond-assign": ["error", "always"],

      // disable rules from base configurations
      "no-console": "off",
      "new-cap": 0,
      "max-len": ["error", { "code": 150 }],
      "no-unused-vars": 0,
      "class-methods-use-this": 0,
      "no-underscore-dangle": 0
  }
}