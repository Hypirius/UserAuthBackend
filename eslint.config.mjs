import js from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";

export default [
  // Base JS rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Optional stricter rules (good for backend)
  ...tseslint.configs.strict,

  {
    files: ["**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // Disable ESLint formatting rules (Prettier handles it)
  prettier,

  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": ["error"],
    },
  },
];
