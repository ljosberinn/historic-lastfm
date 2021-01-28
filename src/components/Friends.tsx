import Link from 'next/link';

import { useProfile } from '../hooks/useProfile';
import { ExternalLink } from './ExternalLink';

type FriendProps = {
  name: string;
  subscriber: boolean;
  img: string;
  odd: boolean;
};

function Friend({ name, subscriber, img, odd }: FriendProps) {
  return (
    <li
      className={['user', subscriber && 'subscriber', odd && 'odd']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="vcard ">
        <strong>
          <Link href="/user/[name]" as={`/user/${name}`} prefetch={false}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              {img && (
                <span className="userImage">
                  <img
                    loading="lazy"
                    className="photo fn"
                    alt={name}
                    height="34"
                    width="34"
                    src={img}
                  />
                </span>
              )}
              <span className="nickname">{name}</span>
            </a>
          </Link>
        </strong>
      </div>
    </li>
  );
}

export function Friends(): JSX.Element {
  const { friends, name } = useProfile();

  return (
    <div className="module">
      <h2 className="heading">
        <span className="h2Wrapper">
          <ExternalLink href={`http://last.fm/user/${name}/friends`}>
            Friends ({friends.length})
          </ExternalLink>
        </span>
      </h2>{' '}
      <ul className="usersSmall clearit">
        {friends.map((friend, index) => (
          <Friend {...friend} odd={index % 2 === 0} key={friend.name} />
        ))}
      </ul>
      <span className="moduleOptions">
        <ExternalLink href={`http://last.fm/user/${name}/friends`}>
          See more
        </ExternalLink>{' '}
      </span>
    </div>
  );
}
