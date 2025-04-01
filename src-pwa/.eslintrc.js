module.exports = {
  ignorePatterns: ['src-pwa/.eslintrc.js'], // Ignorar o .eslintrc.js durante a análise
  parserOptions: {
    project: './src-pwa/tsconfig.json', // Certifique-se de que está apontando para o tsconfig correto
  },
  // Outras configurações do ESLint...
};
