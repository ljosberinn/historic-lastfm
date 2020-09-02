import { useProfile } from '../hooks/useProfile';
import { ExternalLink } from './ExternalLink';

export function Events(): JSX.Element {
  const { name } = useProfile();

  const eventsUrl = `http://last.fm/user/${name}/events`;

  return (
    <div className="module">
      <h2 className="heading">
        <span className="h2Wrapper">
          <ExternalLink href={eventsUrl}>Events</ExternalLink>
        </span>
      </h2>
      <ul className="eventsSmall" />
      <span className="moduleOptions">
        <ExternalLink href={eventsUrl}>See more</ExternalLink>{' '}
        <ExternalLink href="http://last.fm/events/add">Add event</ExternalLink>
      </span>
    </div>
  );
}
