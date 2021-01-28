import type { ReactNode } from 'react';

import { useProfile } from '../hooks/useProfile';
import { ExternalLink } from './ExternalLink';

export function Graph({ children }: { children: ReactNode }): JSX.Element {
  const { name } = useProfile();

  return (
    <div className="module-body chart">
      <table className="candyStriped chart">
        <tbody>{children}</tbody>
      </table>
      <div className="moduleOptions">
        <ExternalLink
          href={`http://last.fm/user/${name}/charts?rangetype=3month&amp;subtype=artists`}
        >
          See more
        </ExternalLink>
      </div>
    </div>
  );
}
