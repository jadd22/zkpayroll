const webpack = require("webpack")
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');
module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    fs: false,
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    assert: require.resolve("assert"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    path: require.resolve("path-browserify"),
    util: require.resolve("util"),
    url: require.resolve("url"),
  });
  config.resolve.fallback = fallback;
  const experiments = config.experiments || {};
  Object.assign(experiments, {
    topLevelAwait: true
  });
  config.experiments = experiments;
  config.ignoreWarnings = [/Failed to parse source map/];
  config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer']
    })
  ]);
  return config;
}


