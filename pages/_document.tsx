import * as Sentry from '@sentry/node';
import NextDocument, { Html, Main, NextScript, Head } from 'next/document';
import React from 'react';

import { attachComponentBreadcrumb } from '../src/utils/sentry';

/**
 * Send to Sentry all uncaught exceptions.
 *
 * If such error happens in this file, it will completely crash the server and
 * render "Internal Server Error" on the client.
 * @see https://leerob.io/blog/configuring-sentry-for-nextjs-apps
 */
['unhandledRejection', 'uncaughtException'].forEach(event => {
  process.on(event, e => {
    Sentry.captureException(e);
  });
});

export default function CustomDocument() {
  attachComponentBreadcrumb('document');

  return (
    <Html lang="en" dir="auto">
      <Head>
        <meta
          name="description"
          content="Historic Last.fm - browse your current profile with the design of 2013"
        />
      </Head>
      <body className="not-responsive">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

CustomDocument.renderDocument = NextDocument.renderDocument;
CustomDocument.getInitialProps = NextDocument.getInitialProps;
