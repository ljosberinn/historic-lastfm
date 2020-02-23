import dayjs from 'dayjs';
import React from 'react';

import { ExternalLink } from '../../components';
import { useProfile } from '../../hooks';
import { createArtistUrl, createTrackUrl } from '../../utils/links';

const timeOfDay = hour => {
  if (hour > 18) {
    return 'evening';
  }

  if (hour > 12) {
    return 'afternoon';
  }

  if (hour > 6) {
    return 'morning';
  }

  return 'night';
};

function Activity({ type, name, timestamp, artist, track, isLast }) {
  const liClasses = [
    'clearit',
    type === 'lovedTrack' && 'loved',
    type === 'profileUpdated' && 'profileupdated',
    isLast && 'last',
  ]
    .filter(Boolean)
    .join(' ');

  if (type === 'profileUpdated') {
    return (
      <li className={liClasses}>
        {name} downgraded his/her profile.{' '}
        <span className="date" title="">
          Just now
        </span>
      </li>
    );
  }

  if (type === 'lovedTrack') {
    const artistUrl = createArtistUrl(artist);
    const trackUrl = createTrackUrl(artistUrl, track);

    const unixDayjs = dayjs.unix(timestamp);

    return (
      <li className={liClasses}>
        <img
          className="icon act_loved_icon"
          width="20"
          height="20"
          alt=""
          src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
        />
        {name} added <ExternalLink href={artistUrl}>{artist}</ExternalLink> -{' '}
        <ExternalLink href={trackUrl}>{track}</ExternalLink> to his/her{' '}
        <ExternalLink href={`https://last.fm/user/${name}/library/loved`}>
          Loved Tracks.
        </ExternalLink>{' '}
        <span className="date" title={unixDayjs.format('D MMM YYYY, HH:mm')}>
          {unixDayjs.format('dddd')} {timeOfDay(unixDayjs.hour())}
        </span>
      </li>
    );
  }

  return null;
}

export default function RecentActivity() {
  const { lovedTracks, name } = useProfile();

  const last9LovedTracks = [...lovedTracks].slice(0, 9);

  return (
    <>
      <h2 className="heading">
        <span className="h2Wrapper">Recent Activity</span>
      </h2>
      <ul className="minifeedSmall">
        {name && (
          <>
            <Activity
              type="profileUpdated"
              name={name}
              timestamp={Date.now()}
            />
            {last9LovedTracks.map((track, index) => (
              <Activity
                type="lovedTrack"
                {...track}
                name={name}
                isLast={index + 1 === last9LovedTracks.length}
                key={track.timestamp}
              />
            ))}
          </>
        )}
      </ul>
    </>
  );
}
