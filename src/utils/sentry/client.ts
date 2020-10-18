import type { BrowserOptions } from '@sentry/react';
import { addBreadcrumb, Severity, init, configureScope } from '@sentry/react';
import type { IncomingMessage } from 'http';
import type { NextRouter } from 'next/router';

import { isomorphicSentryInit, defaultOptions } from '.';

export * from '@sentry/react';

const options: BrowserOptions = {
  ...defaultOptions,
};

isomorphicSentryInit({ configureScope, init, options });

type InitialContextArgs = {
  req?: IncomingMessage;
};

/**
 * Attaches app boot data to Sentry
 */
export const attachInitialContext = ({ req }: InitialContextArgs): void => {
  addBreadcrumb({
    level: Severity.Debug,
    message: `Booting Karma (${
      typeof window === 'undefined' ? 'on server' : 'in browser'
    })`,
  });

  configureScope(scope => {
    if (req) {
      scope.setContext('headers', req.headers);
    }
  });
};

/**
 * Attaches routing data to Sentry
 *
 * @see https://github.com/UnlyEd/next-right-now/blob/v1-ssr-mst-aptd-gcms-lcz-sty/src/pages/_app.tsx#L158
 */
export const attachRoutingContext = ({
  route,
  pathname,
  query,
  asPath,
}: NextRouter): void => {
  configureScope(scope => {
    scope.setContext('router', {
      asPath,
      pathname,
      query,
      route,
    });
  });
};
