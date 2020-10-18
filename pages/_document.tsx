import { captureException } from '@sentry/node';
import NextDocument, { Html, Main, NextScript, Head } from 'next/document';

/**
 * Send to Sentry all uncaught exceptions.
 *
 * If such error happens in this file, it will completely crash the server and
 * render "Internal Server Error" on the client.
 * @see https://leerob.io/blog/configuring-sentry-for-nextjs-apps
 */
['unhandledRejection', 'uncaughtException'].forEach(event => {
  process.on(event, e => {
    captureException(e);
  });
});

// eslint-disable-next-line import/no-default-export
export default function CustomDocument(): JSX.Element {
  return (
    <Html lang="en" dir="auto">
      <Head>
        <meta
          name="description"
          content="Historic Last.fm - browse your current profile with the design of 2013"
        />
        <meta
          name="google-site-verification"
          content="53RBH_7J97-haIV42EDN_7k2Tt4-w9xjKQPmfAm8bwU"
        />
      </Head>
      <body className="not-responsive">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

// eslint-disable-next-line @typescript-eslint/unbound-method
CustomDocument.renderDocument = NextDocument.renderDocument;
// eslint-disable-next-line @typescript-eslint/unbound-method
CustomDocument.getInitialProps = NextDocument.getInitialProps;
