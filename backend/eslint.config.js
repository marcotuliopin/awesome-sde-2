export default [
  {
    files: ["**/*.js"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      // suas regras aqui
      "no-unused-vars": "warn",
      "no-console": "off",
    },
  },
];
