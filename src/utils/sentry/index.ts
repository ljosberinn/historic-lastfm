// import { Debug } from '@sentry/integrations';
import type {
  init as nodeInit,
  NodeOptions,
  configureScope,
} from '@sentry/node';
import type { init as browserInit, BrowserOptions } from '@sentry/react';
import type { Options } from '@sentry/types';

export const defaultOptions: Options = {
  attachStacktrace: true,
  dsn: process.env.SENTRY_DSN,
  enabled: true,
  maxBreadcrumbs: 50,
};

type BootParameters = {
  init: typeof browserInit | typeof nodeInit;
  options: NodeOptions | BrowserOptions;
  configureScope: typeof configureScope;
};

export const isomorphicSentryInit = ({
  init,
  options,
  configureScope,
}: BootParameters): void => {
  if (process.env.NODE_ENV !== 'production') {
    options.beforeSend = () => null;
    // options.integrations = [
    //   new Debug({
    //     // set to true if you want to use `debugger;` instead
    //     debugger: false,
    //   }),
    // ];
  }

  init(options);

  configureScope(scope => {
    scope.setTag('buildTime', process.env.BUILD_TIME);

    if (typeof window === 'undefined') {
      scope.setTag('nodejs', process.version);
    }
  });
};
