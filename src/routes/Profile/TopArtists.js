import React, { useState } from 'react';

import { ExternalLink } from '../../components';
import { useProfile } from '../../hooks';
import { createArtistUrl } from '../../utils/links';

function Graph({ children }) {
  return (
    <div className="module-body chart">
      <table className="candyStriped chart">
        <tbody>{children}</tbody>
      </table>{' '}
      <div className="moduleOptions">
        <a
          href="/web/20130605105804/http://last.fm/user/XHS207GA/charts?rangetype=3month&amp;subtype=artists"
          title=""
        >
          See more
        </a>{' '}
      </div>
    </div>
  );
}

function GraphRow({ index, artist, playCount, name, relativeTo }) {
  const artistUrl = createArtistUrl(artist);

  const isOdd = index % 2 === 0;
  const width = (playCount / relativeTo) * 100;

  return (
    <tr className={isOdd ? 'odd' : 'even'}>
      <td className="positionCell">{index + 1}</td>
      <td className="playbuttonCell">
        <ExternalLink className="playbutton preview-track" href={artistUrl}>
          <img
            className="transparent_png play_icon"
            width="13"
            height="13"
            alt="Play"
            src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/preview/play_indicator.png"
          />
        </ExternalLink>
      </td>
      <td
        className="subjectCell"
        title={`${artist}, played ${playCount} times`}
      >
        <div>
          <ExternalLink href={artistUrl}>{artist}</ExternalLink>
        </div>
      </td>
      <td className="lovedCell"></td>
      <td className="multibuttonCell">
        <ExternalLink
          href={artistUrl}
          className="lfmButton lfmSmallButton lfmSmallMultiButton lfmMultiButtonFull"
        >
          <span />
        </ExternalLink>
      </td>
      <td className="chartbarCell">
        <div style={{ width: `${width}%` }} className="chartbar">
          <ExternalLink
            href={`http://last.fm/user/${name}/library/music/${artist}`}
          >
            <span>{playCount}</span>
          </ExternalLink>
        </div>
      </td>
    </tr>
  );
}

const timespans = [
  { chart: 'week', display: 'Last 7 days', data: '7day' },
  { chart: '1month', display: 'Last month', data: '1month' },
  { chart: '3month', display: 'Last 3 months', data: '3month' },
  { chart: '6month', display: 'Last 6 months', data: '6month' },
  { chart: '12month', display: 'Last 12 months', data: '12month' },
  { chart: 'overall', display: 'Overall', data: 'overall' },
];

function GraphHeader({ activeTimespan, handleChange }) {
  return (
    <div className="horizontalOptions clearit">
      <ul>
        {timespans.map(({ chart, display, data }) => (
          <li
            className={[`chart${chart}`, activeTimespan === data && 'current']
              .filter(Boolean)
              .join(' ')}
            key={chart}
          >
            <a onClick={event => handleChange(event, data)}>{display}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TopArtists() {
  const { topArtists, name } = useProfile();
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
            Top Artists
          </a>
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
          ),
        )}
      </Graph>
    </div>
  );
}
