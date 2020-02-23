import React, { useState } from 'react';

import { useProfile } from '../../hooks';
import Graph from './Graph';
import GraphHeader from './GraphHeader';
import GraphRow from './GraphRow';

export default function TopTracks() {
  const { topTracks, name, lovedTracks } = useProfile();

  const [activeTimespan, setActiveTimespan] = useState('overall');

  function handleChange(event, timespan) {
    event.preventDefault();
    setActiveTimespan(timespan);
  }

  return (
    <div className="module modulecharts modulechartsartists">
      <div id="switcher494146Buttons" className="moduleButtons">
        <a className="mFeeds" href="#">
          <img
            className="icon feed_small_icon"
            width="10"
            height="10"
            alt=""
            src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
          />
          <span>Feeds</span>
        </a>
      </div>

      <h2 className="heading">
        <span className="h2Wrapper">
          <a href="/web/20130605105804/http://last.fm/user/XHS207GA/charts?subtype=artists">
            Top Tracks
          </a>
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
              isLoved={lovedTracks.find(
                dataset => dataset.artist === artist && dataset.track === track,
              )}
              key={track}
            />
          ),
        )}
      </Graph>
    </div>
  );
}
