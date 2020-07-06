import NextDocument, { Html, Main, NextScript, Head } from 'next/document';
import React from 'react';

export default function CustomDocument() {
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
