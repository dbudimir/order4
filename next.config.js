const { parsed: localEnv } = require('dotenv').config();
const webpack = require('webpack');

const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = {
  target: 'serverless',
  exportTrailingSlash: false,
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

    return config;
  }
};

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      env: {
        api_key: 'http://localhost:8040'
      }
    };
  }
  return {
    env: {
      api_key: 'https://qsr-order-api.herokuapp.com'
    }
  };
};
