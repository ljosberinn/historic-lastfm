import dayjs from 'dayjs';
import React from 'react';
import { Link } from 'react-router-dom';

import { ExternalLink } from '../../components';
import { useProfile } from '../../hooks';

function Shout({ message, timestamp, author, subscriber }) {
  return (
    <li className="clearit message">
      <h3 className="author subscriber">
        <Link to={`/user/${author}`}>
          <span className="userImage">
            <img
              src="https://lastfm.freetls.fastly.net/i/u/avatar170s/7ff6057a12ab6429c2231150923aec40.webp"
              className="avatar "
              width="64"
              alt=""
            />
            {subscriber && (
              <img
                className="icon subscriber_icon"
                alt=""
                width="6"
                height="6"
                src="https://web.archive.org/web/20130605105804im_/http://static.lst.fm/flatness/clear.gif"
              />
            )}
          </span>
          {author}
        </Link>
      </h3>
      <p>{message}</p>
      <div className="meta">
        <span className="date">
          {dayjs(timestamp).format('D MMM YYYY, HH:mm')}
        </span>
        <ExternalLink
          className="shoutbox-reply"
          href={`http://last.fm/user/${author}#shoutbox`}
        >
          Reply
        </ExternalLink>
      </div>
    </li>
  );
}

export default function Shoutbox() {
  const { name } = useProfile();

  const shoutboxUrl = `http://last.fm/user/${name}/shoutbox`;

  return (
    <div className="widget widget-lazy/shoutbox">
      <h2 className="heading">
        <span className="h2Wrapper">
          <ExternalLink href={shoutboxUrl}>Shoutbox</ExternalLink>
        </span>
      </h2>
      <div className="shoutboxContainer user-shoutbox">
        <div className="memo">
          <strong>Leave a comment.</strong>{' '}
          <ExternalLink href="http://last.fm/login/">
            Log in to Last.fm
          </ExternalLink>{' '}
          or <ExternalLink href="http://last.fm/join/">sign up</ExternalLink>.
        </div>
        <ul className="shouts">
          <Shout
            author="XHS207GA"
            message="Hey there!"
            timestamp={Date.now()}
            subscriber={false}
          />
          <span className="moduleOptions">
            <ExternalLink href={shoutboxUrl}>All shouts</ExternalLink>
          </span>
        </ul>
      </div>
    </div>
  );
}
