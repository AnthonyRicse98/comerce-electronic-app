import { defineConfig } from "eslint/config";
import nextPlugin from "@next/eslint-plugin-next";
// Importamos la configuración directamente del plugin si es necesario, 
// o usamos las reglas recomendadas:

const eslintConfig = defineConfig([
  {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
  // Si tienes otras configuraciones, agrégalas aquí como objetos individuales
]);

export default eslintConfig;