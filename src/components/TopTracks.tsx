import { useState, MouseEvent } from 'react';

import { Timespan } from '../context/ProfileContext';
import { useProfile } from '../hooks/useProfile';
import { ExternalLink } from './ExternalLink';
import { Graph } from './Graph';
import { GraphHeader } from './GraphHeader';
import { GraphRow } from './GraphRow';

export function TopTracks(): JSX.Element {
  const { topTracks, name, lovedTracks } = useProfile();

  const [activeTimespan, setActiveTimespan] = useState(Timespan.overall);

  function handleChange(
    event: MouseEvent<HTMLSpanElement>,
    timespan: Timespan
  ) {
    event.preventDefault();
    setActiveTimespan(timespan);
  }

  return (
    <div className="module">
      <div className="moduleButtons">
        <span>
          <img
            loading="lazy"
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
            href={`http://last.fm/user/${name}/charts?subtype=tracks`}
          >
            Top Tracks
          </ExternalLink>
        </span>
      </h2>

      <GraphHeader
        handleChange={handleChange}
        activeTimespan={activeTimespan}
      />

      <Graph>
        {topTracks[activeTimespan].map(
          ({ playCount, artist, track }, index) => (
            <GraphRow
              index={index}
              relativeTo={topTracks[activeTimespan][0].playCount}
              playCount={playCount}
              artist={artist}
              name={name}
              track={track}
              isLoved={
                !!lovedTracks.find(
                  dataset =>
                    dataset.artist === artist && dataset.track === track
                )
              }
              key={track}
            />
          )
        )}
      </Graph>
    </div>
  );
}
