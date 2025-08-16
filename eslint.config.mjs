import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import eslintConfigPrettier from "eslint-config-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.config({
    extends: ["next/core-web-vitals", "next/typescript", "prettier", "airbnb"],
  }),
  eslintConfigPrettier,
  eslintPluginPrettier,
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "import/no-extraneous-dependencies": "off",
      "no-underscore-dangle": "off",
      "react/jsx-filename-extension": "off",
      "import/extensions": "off",
      "no-multi-spaces": "error",
      "no-shadow": "off",
      "no-undef": "off",
      "react/no-array-index-key": "off",
      "react/require-default-props": "off",
      "react/jsx-props-no-spreading": "off",
    },
  },
];

export default eslintConfig;
