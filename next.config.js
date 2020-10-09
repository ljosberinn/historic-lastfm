const withPrefresh = require('@prefresh/next');
const SentryWebpackPlugin = require('@sentry/webpack-plugin');

const date = new Date();

const {
  SENTRY_DSN,
  SENTRY_ORG,
  SENTRY_PROJECT,
  SENTRY_AUTH_TOKEN,
  NODE_ENV,
} = process.env;

// eslint-disable-next-line no-console
console.debug(`> Building on NODE_ENV="${NODE_ENV}"`);

const config = {
  env: {
    BUILD_TIME: date.toString(),
    BUILD_TIMESTAMP: +date,
  },
  typescript: {
    /**
     * `yarn lint:types` ran in CI already so we can safely assume no errors
     *  here, conveniently reducing build time by ~55%
     * @see https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
     */
    ignoreBuildErrors: true,
  },
  experimental: {
    modern: true,
    polyfillsOptimization: true,
  },
  reactStrictMode: true,

  webpack(config, { dev, isServer, buildId }) {
    if (!isServer) {
      config.resolve.alias['@sentry/node'] = '@sentry/react';
    }

    if (
      SENTRY_DSN &&
      SENTRY_ORG &&
      SENTRY_PROJECT &&
      SENTRY_AUTH_TOKEN &&
      NODE_ENV === 'production'
    ) {
      config.plugins.push(
        new SentryWebpackPlugin({
          ignore: ['node_modules'],
          include: '.next',
          release: buildId,
          urlPrefix: '~/_next',
        })
      );
    }

    const splitChunks = config.optimization && config.optimization.splitChunks;

    if (splitChunks) {
      const cacheGroups = splitChunks.cacheGroups;
      const preactModules = /[/\\]node_modules[/\\](preact|preact-render-to-string|preact-context-provider)[/\\]/;

      if (cacheGroups.framework) {
        cacheGroups.preact = Object.assign({}, cacheGroups.framework, {
          test: preactModules,
        });
        cacheGroups.commons.name = 'framework';
      } else {
        cacheGroups.preact = {
          chunks: 'all',
          name: 'commons',
          test: preactModules,
        };
      }
    }

    // Install webpack aliases:
    const aliases = config.resolve.alias || (config.resolve.alias = {});
    aliases.react = aliases['react-dom'] = 'preact/compat';

    // inject Preact DevTools
    if (dev && !isServer) {
      const entry = config.entry;
      config.entry = async () => {
        const entries = await entry();

        entries['main.js'] = ['preact/debug'].concat(entries['main.js'] || []);

        return entries;
      };
    }

    return config;
  },
};

module.exports = withPrefresh(config);
