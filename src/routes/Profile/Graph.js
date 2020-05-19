import React from 'react';

import { ExternalLink } from '../../components';
import { useProfile } from '../../hooks';

export default function Graph({ children }) {
  const { name } = useProfile();

  return (
    <div className="module-body chart">
      <table className="candyStriped chart">
        <tbody>{children}</tbody>
      </table>
      <div className="moduleOptions">
        <ExternalLink href={`http://last.fm/user/${name}/charts?rangetype=3month&amp;subtype=artists`}>
          See more
        </ExternalLink>
      </div>
    </div>
  );
}
