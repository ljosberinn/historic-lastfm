const DotEnv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production' || !!process.env.NETLIFY;

module.exports = {
  mode: isProduction ? 'production' : 'development',
  plugins: [new DotEnv()],
  optimization: {
    minimize: isProduction,
  },
};
