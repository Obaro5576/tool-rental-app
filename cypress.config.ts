import { defineConfig } from 'cypress';
import startDevServer from '@cypress/webpack-dev-server'; 
import webpackConfig from './webpack.config.js'; 

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
  component: {
    supportFile: 'cypress/support/component.ts',
    devServer: {
      framework: 'react',
      bundler: 'webpack',
      webpackConfig: {
        ...webpackConfig, // Spread the existing config
        mode: 'development' as 'development' | 'none' | 'production', // Explicitly set the mode
      },
    },
  },
});
