module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020,
    project: ['tsconfig.json']
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-deprecated-slot-attribute": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "eol-last": ["error", "always"],
    "quotes": ["error", "double"],
    "no-multiple-empty-lines": ["error", {
      "max": 2,
      "maxBOF": 0,
      "maxEOF": 1
    }],
    "semi": ["error", "never"],
  }
}
