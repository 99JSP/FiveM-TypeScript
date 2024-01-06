const path = require('path');
const RemovePlugin = require('remove-files-webpack-plugin');
const buildPath = path.resolve(__dirname, 'dist');
const { ESLINT_MODES } = require('@craco/craco');

module.exports = {
  devServer: {
    writeToDisk: true,
  },
  webpack: {
    // configure: {
    //   output: {
    //     path: path.resolve(__dirname, 'dist'),
    //   },
    // },
    configure: (webpackConfig) => {
      // Because CEF has issues with loading source maps properly atm,
      // lets use the best we can get in line with `eval-source-map`
      if (webpackConfig.mode === 'development' && process.env.IN_GAME_DEV) {
        webpackConfig.devtool = 'eval-source-map';
        webpackConfig.output.path = path.join(__dirname, 'dist');
      }

      webpackConfig.output.path = path.join(__dirname, 'dist');
      webpackConfig.plugins = [
        ...webpackConfig.plugins,

        new RemovePlugin({
          before: {
            include: [path.resolve(buildPath)],
          },
        }),
      ];

      return webpackConfig;
    },
  },
  devServer: (devServerConfig) => {
    if (process.env.IN_GAME_DEV) {
      // Used for in-game dev mode
      devServerConfig.writeToDisk = true;
    }

    return devServerConfig;
  },
   eslint: {
    mode: ESLINT_MODES.extends,
    configure: () =>
      // Workaround for broken ESLINT_MODES.file mode
      require('./.eslintrc.json'),

  },
};
