import { Debug } from '@sentry/integrations';
import * as Sentry from '@sentry/node';
import { IncomingMessage } from 'http';
import { NextRouter } from 'next/router';

export { ErrorBoundary } from '@sentry/react';

const { init, configureScope, addBreadcrumb, Severity } = Sentry;

const sentryOptions: Sentry.NodeOptions = {
  attachStacktrace: true,
  dsn: process.env.SENTRY_DSN!,
  enabled: true,
  maxBreadcrumbs: 50,
};

if (process.env.NODE_ENV !== 'production') {
  // don't actually send the errors to Sentry
  sentryOptions.beforeSend = () => null;

  sentryOptions.integrations = [
    new Debug({
      // set to true if you want to use `debugger;` instead
      debugger: false,
    }),
  ];
}

init(sentryOptions);

configureScope(scope => {
  scope.setTag('nodejs', process.version);
  scope.setTag('buildTime', process.env.BUILD_TIME!);
});

/**
 * Attaches lambda request data to Sentry
 */
export const attachLambdaContext = (req: IncomingMessage) => {
  configureScope(scope => {
    scope.setTag('host', req.headers.host || '');
    scope.setTag('url', req.url || '');
    scope.setTag('method', req.method || '');
  });
};

interface InitialContextArgs {
  req?: IncomingMessage;
  language: string;
  session: Sentry.User | null;
}

const IS_BROWSER = typeof window !== 'undefined';

/**
 * Attaches routing data to Sentry
 *
 * @see https://github.com/UnlyEd/next-right-now/blob/v1-ssr-mst-aptd-gcms-lcz-sty/src/pages/_app.tsx#L158
 */
export const attachRoutingContext = (
  { route, pathname, query, asPath }: NextRouter,
  name: string = 'unknown'
) => {
  configureScope(scope => {
    scope.setContext('router', {
      asPath,
      pathname,
      query,
      route,
    });
  });

  // in prod, this will make components show up with their minified name!
  attachComponentBreadcrumb(name);
};

export const attachComponentBreadcrumb = (name: string) => {
  addBreadcrumb({
    level: Severity.Debug,
    message: `Preparing "${name}" (${IS_BROWSER ? 'in browser' : 'on server'})`,
  });
};
