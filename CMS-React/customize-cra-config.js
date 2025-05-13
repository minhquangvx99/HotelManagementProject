
import { theme } from './src/config/theme/ThemeVariables';
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    configure: {
      resolve: {
        fallback: {
          path: false
        },
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              ...theme
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};