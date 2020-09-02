import { useState } from 'react';

import { Timespan } from '../context/ProfileContext';
import { useProfile } from '../hooks/useProfile';
import { ExternalLink } from './ExternalLink';
import { Graph } from './Graph';
import { GraphHeader } from './GraphHeader';
import { GraphRow } from './GraphRow';

export function TopArtists(): JSX.Element {
  const { topArtists, name } = useProfile();
  const [activeTimespan, setActiveTimespan] = useState(Timespan.overall);

  function handleChange(event, timespan: Timespan) {
    event.preventDefault();
    setActiveTimespan(timespan);
  }

  return (
    <div className="module">
      <div className="moduleButtons">
        <span>
          <img
            className="icon feed_small_icon"
            width="10"
            height="10"
            alt=""
            src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
          />
          <span>Feeds</span>
        </span>
      </div>

      <h2 className="heading">
        <span className="h2Wrapper">
          <ExternalLink
            href={`http://last.fm/user/${name}/charts?subtype=artists`}
          >
            Top Artists
          </ExternalLink>
        </span>
      </h2>

      <GraphHeader
        handleChange={handleChange}
        activeTimespan={activeTimespan}
      />

      <Graph>
        {topArtists[activeTimespan].map(
          ({ playCount, name: artist }, index) => (
            <GraphRow
              index={index}
              relativeTo={topArtists[activeTimespan][0].playCount}
              playCount={playCount}
              artist={artist}
              name={name}
              key={artist}
            />
          )
        )}
      </Graph>
    </div>
  );
}
