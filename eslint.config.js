import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    
    languageOptions: {
      parser: tsparser,
      sourceType: "module",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: "error"
    },
    
    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
      prettierConfig: prettierConfig,
      unicorn: eslintPluginUnicorn
    },
    
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "no-console": "warn",
      "quotes": ["error", "double"],
      "prettier/prettier": "error",
      "@typescript-eslint/consistent-type-assertions": ["error", { "assertionStyle": "never" }],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": ["error", { "accessibility": "explicit", "overrides": { "constructors": "off" } }],
      "@typescript-eslint/member-ordering": "error",
      "class-methods-use-this": "error",
      ...tseslint.configs.recommendedTypeChecked,
      ...eslintPluginUnicorn.configs.recommended.rules
    },
  },
];