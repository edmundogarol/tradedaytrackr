import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";

export default [
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json", // For rules that need type info
      },
    },
    plugins: {
      "@typescript-eslint": tsPlugin,
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      import: importPlugin,
    },
    rules: {
      // TypeScript rules
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],

      // React rules
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "react-hooks/rules-of-hooks": "error",
      "react/no-unknown-property": [
        "error",
        {
          ignore: ["^\\$"],
        },
      ],
      // Import plugin
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["parent", "sibling", "index"],
          ],
        },
      ],

      // Styled-components transient props ($ prefix)
      "react/forbid-foreign-prop-types": "off",
    },
    settings: {
      react: { version: "detect" },
    },
  },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
  {
    files: ["**/*StyledComponents.{ts,tsx}"],
    rules: {
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "typeProperty",
          format: ["camelCase"],
          custom: {
            regex: "^\\$",
            match: true,
          },
        },
      ],
    },
  },
];
