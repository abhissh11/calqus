import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // 🔧 TypeScript-specific
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",

           // 🔧 Next.js image rule
      "@next/next/no-img-element": "off",

      // 🔧 React
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "off",
      "react/display-name": "off",
      "react/prop-types": "off",

      // 🔧 General JS rules
      "no-console": "off",
      "no-unused-vars": "off",
    },
  },
];

export default eslintConfig;
