import { useProfile } from '../hooks/useProfile';
import { createArtistUrl, createTrackUrl } from '../utils/link';
import { ExternalLink } from './ExternalLink';

type LibraryItemProps = {
  name: string;
  img: string;
  playCount: number;
  userName: string;
};

function LibraryItem({ name, img, playCount, userName }: LibraryItemProps) {
  const artistUrl = createArtistUrl(name);
  const libraryUrl = `https://last.fm/${userName}/library/music/${name}`;

  return (
    <li className=" first">
      <ExternalLink href={artistUrl}>
        <span className="pictureFrame">
          <span className="image">
            <img loading="lazy" height="126" width="126" alt="" src={img} />
          </span>
          <span className="overlay" />
        </span>
        <strong className="name">{name}</strong>
      </ExternalLink>{' '}
      <a href={libraryUrl} className="plays">
        <span dir="ltr">({playCount} plays)</span>
      </a>{' '}
      <a className="playbutton preview-track" href={artistUrl}>
        <img
          loading="lazy"
          className="transparent_png play_icon"
          width="13"
          height="13"
          alt="Play"
          src="/img/play_indicator.png"
        />
      </a>
    </li>
  );
}

export function Library(): JSX.Element {
  const { name, topArtists, lovedTracks, totalArtistAmount } = useProfile();

  const formattedArtistAmount = new Intl.NumberFormat(
    typeof window === 'undefined' ? 'en' : window.navigator.language
  ).format(Number.parseInt(totalArtistAmount));

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
            {formattedArtistAmount} Artists in total
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

        <ul className="libraryItems artistsLarge">
          {topArtists.overall.map(data => (
            <LibraryItem key={data.name} userName={name} {...data} />
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
                      loading="lazy"
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
                      loading="lazy"
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

type LastLovedTrack = {
  artist: string;
  track: string;
};

function LastLovedTrack({ artist, track }: LastLovedTrack) {
  const artistUrl = createArtistUrl(artist);
  const trackUrl = createTrackUrl(artistUrl, track);

  return (
    <p>
      Last loved: <ExternalLink href={artistUrl}>{artist}</ExternalLink> –{' '}
      <ExternalLink href={trackUrl}>{track}</ExternalLink>{' '}
    </p>
  );
}
