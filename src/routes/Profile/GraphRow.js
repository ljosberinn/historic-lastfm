import React from 'react';

import { ExternalLink } from '../../components';
import { createArtistUrl, createTrackUrl } from '../../utils/links';

export default function GraphRow({
  index,
  artist,
  playCount,
  name,
  track,
  relativeTo,
  isLoved,
}) {
  const artistUrl = createArtistUrl(artist);
  const trackUrl = track && createTrackUrl(artistUrl, track);

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
      <td className="subjectCell" title={`${track}, played ${playCount} times`}>
        <div>
          <ExternalLink href={artistUrl}>{artist}</ExternalLink>{' '}
          {trackUrl && (
            <>
              - <ExternalLink href={trackUrl}>{track}</ExternalLink>
            </>
          )}
        </div>
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
      <td className="multibuttonCell">
        <ExternalLink
          href={trackUrl || artistUrl}
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
