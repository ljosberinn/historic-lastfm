import dayjs from 'dayjs';
import React from 'react';

import ExternalLink from '../../components/ExternalLink';
import { useProfile } from '../../hooks';
import { createArtistUrl, createTrackUrl } from '../../utils/links';

const now = dayjs();

function TrackList({ tracks, lovedTracks }) {
  const lovedIds = new Set(lovedTracks.map(({ id }) => id));

  return (
    <table className="tracklist withimages" id="recentTracks">
      <tbody>
        {tracks.map(trackData => (
          <Track
            {...trackData}
            isLoved={trackData.id && lovedIds.has(trackData.id)}
            key={trackData.timestamp}
          />
        ))}
      </tbody>
    </table>
  );
}

function Track({ artist, track, isLoved, timestamp, img }) {
  const artistUrl = createArtistUrl(artist);
  const trackLink = createTrackUrl(artistUrl, track);

  const formattedTimestamp = dayjs
    .unix(timestamp || Date.now() / 1000)
    .from(now);

  return (
    <tr>
      <td className="imageCell imageSmall">
        <ExternalLink href={trackLink}>
          <img height="34" width="34" alt="" src={img} />
        </ExternalLink>
      </td>

      <td className="playbuttonCell">
        <div />
      </td>
      <td className="subjectCell">
        <ExternalLink href={artistUrl}>{artist}</ExternalLink> –{' '}
        <ExternalLink href={trackLink}>{track}</ExternalLink>{' '}
      </td>
      <td className="lovedCell">
        {isLoved && (
          <img
            title="A loved track"
            alt="Loved track"
            className="icon loved_indicator_icon"
            width="11"
            height="9"
            src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
          />
        )}
      </td>
      <td className="smallmultibuttonCell">
        <ExternalLink
          href={trackLink}
          className="lfmButton lfmSmallButton lfmSmallMultiButton lfmMultiButtonFull"
        >
          <span />
        </ExternalLink>
      </td>
      <td className="dateCell">
        <span className="date">{formattedTimestamp}</span>
      </td>
    </tr>
  );
}

export default function RecentlyListenedTracks() {
  const { name, recentTracks, lovedTracks } = useProfile();

  return (
    <div className="module moduletracks" id="recentTracks">
      <h2 className="heading">
        <span className="h2Wrapper">
          <a href={`http://last.fm/user/${name}/tracks`} title="">
            Recently Listened Tracks
          </a>
        </span>
      </h2>{' '}
      <div id="recentTracksButtons" className="moduleButtons">
        <ExternalLink
          href={`http://ws.audioscrobbler.com/1.0/user/${name}/recenttracks.rss`}
        >
          <img
            className="icon feed_small_icon"
            width="10"
            height="10"
            src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
            alt=""
          />
        </ExternalLink>
      </div>
      <div className="module-body">
        <div className="recentTracksContainer">
          {name && recentTracks.length === 0 ? (
            <p>API did not respond, sorry.</p>
          ) : (
            <TrackList tracks={recentTracks} lovedTracks={lovedTracks} />
          )}

          <span className="moduleOptions">
            <ExternalLink href={`http://last.fm/user/${name}/tracks`} title="">
              See more
            </ExternalLink>
          </span>
        </div>
      </div>
    </div>
  );
}
