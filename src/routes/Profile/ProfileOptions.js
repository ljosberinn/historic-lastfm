import React from 'react';

import ExternalLink from '../../components/ExternalLink';
import { useProfile } from '../../hooks';

export default function ProfileOptions() {
  const { name, realName, country } = useProfile();

  return (
    <div className="profileOptions clearit">
      <div className="options">
        <ul className="buttons">
          <li>
            <ExternalLink
              href={`http://last.fm/user/${name}`}
              id="button1"
              className="lfmButton lfmBigButton lfmBefriendButton 
"
              title={[realName, country].join(', ')}
            >
              <strong>
                <img
                  className="icon addtofriends_icon"
                  width="17"
                  height="17"
                  alt=""
                  src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
                />
                <span>Add as friend</span>
              </strong>
            </ExternalLink>
          </li>
          <li>
            <ExternalLink
              href={`http://last.fm/inbox/compose?to=${name}`}
              className="icon lfmMailButton"
            >
              <img
                className="icon mailuser_icon"
                width="13"
                height="9"
                alt=""
                src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
              />
              <span>Send a message</span>
            </ExternalLink>
          </li>
          <li>
            <a href="#shoutbox" className="icon lfmShoutboxButton">
              <img
                className="icon comment_icon"
                width="13"
                height="11"
                alt=""
                src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
              />
              <span>Leave a shout</span>
            </a>
          </li>
        </ul>
      </div>

      <Tasteometer name={name} />
    </div>
  );
}

function Tasteometer({ name }) {
  return (
    <div id="tasteometer" className="tasteometer userTasteometer">
      <p>
        Your musical compatibility with <strong>{name}</strong> is{' '}
        <strong className="reading">Unknown</strong>
      </p>
      <span className="bar">
        <span style={{ width: 0 }} />
      </span>

      <span className="moduleOptions" id="tasteometertoggle">
        <span>Compare your taste</span>
      </span>
    </div>
  );
}
