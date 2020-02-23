import React from 'react';
import { Link } from 'react-router-dom';

import { ExternalLink } from '../../components';
import { useProfile } from '../../hooks';

function Friend({ name, url, country, subscriber, img, odd }) {
  return (
    <li
      className={['user', subscriber && 'subscriber', odd && 'odd']
        .filter(Boolean)
        .join(' ')}
    >
      <div className="vcard ">
        <strong>
          <Link
            to={`/user/${name}`}
            title={country}
            rel="acquaintance"
            className="url"
          >
            {img && (
              <span className="userImage">
                <img
                  className="photo fn"
                  alt={name}
                  height="34"
                  width="34"
                  src={img}
                />
              </span>
            )}
            <span className="nickname">{name}</span>
          </Link>
        </strong>
      </div>
    </li>
  );
}

export default function Friends() {
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
      <ul className="usersSmall clearit" odd="1">
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
