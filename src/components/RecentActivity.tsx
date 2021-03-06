import dayjs from 'dayjs';

import { useProfile } from '../hooks/useProfile';
import { createArtistUrl, createTrackUrl } from '../utils/link';
import { ExternalLink } from './ExternalLink';

const timeOfDay = (hour: number) => {
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

type ActivityProps = {
  type: string;
  name: string;
  timestamp: number;
  artist?: string;
  track?: string;
  isLast?: boolean;
};

function Activity({
  type,
  name,
  timestamp,
  artist,
  track,
  isLast,
}: ActivityProps) {
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

  if (type !== 'lovedTrack') {
    return null;
  }

  const artistUrl = artist ? createArtistUrl(artist) : undefined;
  const trackUrl =
    artistUrl && track ? createTrackUrl(artistUrl, track) : undefined;

  const unixDayjs = dayjs.unix(timestamp);

  return (
    <li className={liClasses}>
      <img
        loading="lazy"
        className="icon act_loved_icon"
        width="20"
        height="20"
        alt=""
        src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
      />
      {name} added{' '}
      {artistUrl ? (
        <ExternalLink href={artistUrl}>{artist}</ExternalLink>
      ) : (
        artist
      )}{' '}
      -{' '}
      {trackUrl ? <ExternalLink href={trackUrl}>{track}</ExternalLink> : track}{' '}
      to his/her{' '}
      <ExternalLink href={`https://last.fm/user/${name}/library/loved`}>
        Loved Tracks.
      </ExternalLink>{' '}
      <span className="date" title={unixDayjs.format('D MMM YYYY, HH:mm')}>
        {unixDayjs.format('dddd')} {timeOfDay(unixDayjs.hour())}
      </span>
    </li>
  );
}

export function RecentActivity(): JSX.Element {
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
                key={track.timestamp}
                {...track}
                name={name}
                isLast={index + 1 === last9LovedTracks.length}
              />
            ))}
          </>
        )}
      </ul>
    </>
  );
}
