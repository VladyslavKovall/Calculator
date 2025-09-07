import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    ignores: ["dist/**", "node_modules/**"], 
    plugins: { js },
    extends: ["js/recommended"],

    languageOptions: {
      ecmaVersion: "latest",       
      sourceType: "module",        
      globals: globals.browser,    
    },

    rules: {
      
      "eqeqeq": "error",           
      "curly": "error",            
      "no-var": "error",          
      "prefer-const": "warn",       
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], 
      "no-multiple-empty-lines": ["warn", { max: 1 }], 
      "semi": ["error", "always"], 
      "quotes": ["error", "double"],
      "indent": ["error", 2],       
     
      "no-console": "off",        
      "no-alert": "warn",          
     
      "object-curly-spacing": ["error", "always"],  
      "array-bracket-spacing": ["error", "never"],  
    },
  },
]);
