const {withPlugins} = require('@expo/config-plugins');
const withAndroidQueries = require('./linking.plugin');

module.exports = withAndroidQueries(({config}) => {
  return {
    ...config,
  };
});
