import React from 'react';

import playIndicator from '../../assets/img/play_indicator.png';
import ExternalLink from '../../components/ExternalLink';
import { useProfile } from '../../hooks';
import { createArtistUrl, createTrackUrl } from '../../utils/links';

function LibraryItem({ name, img, playCount, userName }) {
  const artistUrl = createArtistUrl(name);
  const libraryUrl = `https://last.fm/${userName}/library/music/${name}`;

  return (
    <li className=" first">
      <ExternalLink href={artistUrl}>
        <span className="pictureFrame">
          <span className="image">
            <img height="126" width="126" alt="" src={img} />
          </span>
          <span className="overlay"></span>
        </span>
        <strong className="name">{name}</strong>
      </ExternalLink>{' '}
      <a href={libraryUrl} className="plays">
        <span dir="ltr">({playCount} plays)</span>
      </a>{' '}
      <a className="playbutton preview-track" href={artistUrl}>
        <img
          className="transparent_png play_icon"
          width="13"
          height="13"
          alt="Play"
          src={playIndicator}
        />
      </a>
    </li>
  );
}

export default function Library() {
  const { name, topArtists, lovedTracks } = useProfile();

  return (
    <div id="taste" className="clearit module modulelibrary">
      <h2 className="heading">
        <span className="h2Wrapper">
          <ExternalLink href={`http://last.fm/user/${name}/library`}>
            {name}’s Library
          </ExternalLink>
        </span>
      </h2>

      <div className="module-body">
        <p className="libraryInfo clearit">
          <ExternalLink
            href={`http://last.fm/user/${name}/library`}
            className="total"
          >
            1,687 Artists in total
          </ExternalLink>
          <br /> <span className="rangetype">Showing: Custom selection</span>{' '}
        </p>

        <ExternalLink
          className="stationbutton stationbuttonMedium stationbuttonMediumRight"
          title={`${name} Library Radio`}
          href={`http://last.fm/listen/user/${name}/personal`}
        >
          <span className="stationButtonWrapper">
            Play {name}’s Library Radio
          </span>
        </ExternalLink>

        <ul
          className=" libraryItems artistsLarge
    "
        >
          {topArtists.map(data => (
            <LibraryItem userName={name} {...data} key={data.name} />
          ))}
        </ul>

        <div id="tasteCocktail">
          <div className="twoCols">
            <div className="lovedTracks leftColumn">
              <div className="wrapper">
                <h3>
                  <ExternalLink
                    href={`http://last.fm/user/${name}/library/loved`}
                    className="icon"
                  >
                    <img
                      className="icon loved_indicator_icon"
                      width="11"
                      height="9"
                      src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
                      alt=""
                    />
                    <span>Loved Tracks ({lovedTracks.length})</span>{' '}
                  </ExternalLink>{' '}
                  <ExternalLink
                    href={`http://ws.audioscrobbler.com/2.0/user/${name}/lovedtracks.rss`}
                    className="icon"
                  >
                    <img
                      className="icon feed_small_icon"
                      width="10"
                      height="10"
                      src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
                      alt=""
                    />
                  </ExternalLink>
                </h3>
                {lovedTracks.length > 0 && (
                  <LastLovedTrack {...lovedTracks[lovedTracks.length - 1]} />
                )}
              </div>
            </div>
          </div>
        </div>
        <span className="moduleOptions">
          <ExternalLink href={`http://last.fm/user/${name}/library`}>
            See more
          </ExternalLink>
        </span>
      </div>
    </div>
  );
}

function LastLovedTrack({ artist, track }) {
  const artistUrl = createArtistUrl(artist);
  const trackUrl = createTrackUrl(artistUrl, track);

  return (
    <p>
      Last loved: <ExternalLink href={artistUrl}>{artist}</ExternalLink> –{' '}
      <ExternalLink href={trackUrl}>{track}</ExternalLink>{' '}
    </p>
  );
}
