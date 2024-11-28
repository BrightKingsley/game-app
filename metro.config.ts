const {getDefaultConfig} = require('expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
module.exports = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    unstable_allowRequireContext: true, // Enable require.context
  },
  resolver: {
    ...defaultConfig.resolver,
    assetExts: [...defaultConfig.resolver.assetExts, 'lottie'], // Add custom extensions
  },
};
