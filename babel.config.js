module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          lazyImports: true,
          native: {
            unstable_transformAccount: 'hermes-stable',
          },
        },
      ],
    ],
    plugins: [
      // [
      //   'module:react-native-dotenv',
      //   {
      //     envName: 'APP_ENV',
      //     moduleName: '@env',
      //     path: '.env',
      //     blockList: null,
      //     allowList: null,
      //     safe: false,
      //     allowUndefined: false,
      //     verbose: false,
      //   },
      // ],
      'nativewind/babel',
      [
        'module-resolver',
        {
          alias: {
            '#': './src',
            lib: './src/lib',
            platform: './src/platform',
            state: './src/state',
            view: './src/view',
          },
        },
      ],
      'react-native-reanimated/plugin', // NOTE: this plugin must be last
    ],
    env: {
      production: {
        plugins: ['transform-remove-console'],
      },
    },
  };
};
