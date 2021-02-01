const date = new Date();

const withSentry = (config, options) => {
  if (!options.isServer) {
    config.resolve.alias['@sentry/node'] = '@sentry/react';
  }

  /**
   * enable this if you do _NOT_ use the Vercel Sentry integration
   * but still want to fully use Sentry
   *
   * @see https://docs.sentry.io/product/integrations/vercel/
   */

  const hasSentry =
    process.env.NEXT_PUBLIC_SENTRY_DSN &&
    process.env.SENTRY_ORG &&
    process.env.SENTRY_PROJECT &&
    process.env.SENTRY_AUTH_TOKEN &&
    process.env.VERCEL_GITHUB_COMMIT_SHA;

  if (hasSentry) {
    const SentryWebpackPlugin = require('@sentry/webpack-plugin');

    config.plugins.push(
      /**
       * @see https://github.com/getsentry/sentry-webpack-plugin#options
       */
      new SentryWebpackPlugin({
        ignore: ['node_modules'],
        include: '.next',
        release: process.env.VERCEL_GITHUB_COMMIT_SHA,
        urlPrefix: '~/_next',
      })
    );
  }
};

// eslint-disable-next-line no-console
console.debug(`> Building on NODE_ENV="${process.env.NODE_ENV}"`);

const config = {
  env: {
    BUILD_TIME: date.toString(),
    BUILD_TIMESTAMP: Number(date),
  },
  experimental: {
    modern: true,
    polyfillsOptimization: true,
    productionBrowserSourceMaps: true,
  },
  reactStrictMode: true,
  typescript: {
    /**
     * `yarn lint:types` ran in CI already so we can safely assume no errors
     *  here, conveniently reducing build time by ~55%
     * @see https://nextjs.org/docs/api-reference/next.config.js/ignoring-typescript-errors
     */
    ignoreBuildErrors: true,
  },
  webpack(config, options) {
    withSentry(config, options);

    return config;
  },
};

module.exports = config;
