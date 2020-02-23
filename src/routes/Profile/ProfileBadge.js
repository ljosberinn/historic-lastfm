import dayjs from 'dayjs';
import React from 'react';

import ExternalLink from '../../components/ExternalLink';
import { useProfile } from '../../hooks';

export default function ProfileBadge() {
  return (
    <div id="userBadge" className="clearit subscriber vcard">
      <Avatar />
      <Info />
    </div>
  );
}

function Avatar() {
  const { img, subscriber } = useProfile();

  return (
    <div className="badgeAvatar">
      <span className="userImage">
        <img
          className="photo"
          height="248"
          width="126"
          alt=""
          src={img || 'https://via.placeholder.com/126x248.png'}
        />
      </span>{' '}
      {subscriber && (
        <p className="userType">
          <a href="http://last.fm/subscribe">Subscriber</a>
        </p>
      )}
    </div>
  );
}

function Info() {
  const {
    name,
    country,
    realName,
    playlists,
    totalPlayCount,
    recentTracks,
    registered,
    lovedTracks,
  } = useProfile();

  const formattedRegistration = dayjs.unix(registered).format('DD MMM YYYY');
  const passedDays =
    recentTracks.length > 0
      ? Math.round((recentTracks[0].timestamp - registered) / 60 / 60 / 24)
      : 0;

  const avgPerDay = Math.round(totalPlayCount / passedDays);

  return (
    <div className="badgeInfo">
      <p className="userInfo adr">
        <strong className="fn">{realName}</strong>{' '}
        <span className="country-name">{country}</span>
        <br />
        <ExternalLink
          href="https://github.com/ljosberinn/historic-lastfm"
          className="url homepage"
        >
          recreated by Gerrit Alex
        </ExternalLink>
        <small className="userLastseen">
          Last seen: just now, here at least.
        </small>
      </p>

      <div className="userData">
        <span
          className="userPlays"
          title={`That’s an average of ${avgPerDay} tracks per day`}
        >
          <strong>
            <span className="count">
              {totalPlayCount?.split('').map((digit, index) => (
                <span className="flip" key={index}>
                  {digit}
                </span>
              ))}
            </span>{' '}
            plays
          </strong>{' '}
          <small>since {formattedRegistration}</small>
        </span>
        <p className="userActivity">
          <ExternalLink href={`http://last.fm/user/${name}/library/loved`}>
            {lovedTracks.length} Loved Tracks
          </ExternalLink>{' '}
          |{' '}
          <ExternalLink href={`http://last.fm/user/${name}/grapevine`}>
            0 Posts
          </ExternalLink>{' '}
          |{' '}
          <ExternalLink href={`http://last.fm/user/${name}/playlists`}>
            {playlists} Playlists
          </ExternalLink>{' '}
          |{' '}
          <span className="shoutCount">
            <a href="#shoutbox" id="shoutBoxLink" className="icon">
              <img
                className="icon comment_icon"
                width="13"
                height="11"
                alt=""
              />
              <span>1 shout</span>
            </a>
          </span>
        </p>
      </div>
    </div>
  );
}
