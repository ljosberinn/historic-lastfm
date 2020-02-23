import React from 'react';

import { ExternalLink } from '../../components';

export default function Graph({ children }) {
  return (
    <div className="module-body chart">
      <table className="candyStriped chart">
        <tbody>{children}</tbody>
      </table>
      <div className="moduleOptions">
        <ExternalLink href="http://last.fm/user/XHS207GA/charts?rangetype=3month&amp;subtype=artists">
          See more
        </ExternalLink>
      </div>
    </div>
  );
}
