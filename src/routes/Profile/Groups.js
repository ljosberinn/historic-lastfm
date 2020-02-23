import React from 'react';

import { ExternalLink } from '../../components';
import { useProfile } from '../../hooks';

function Group({ name, img, members }) {
  return (
    <li className="clearit">
      <ExternalLink href={`http://last.fm/group/${name}`}>
        <strong>
          <span className="groupImg">
            <img
              className="groupImage imagesmallsquare"
              height="34"
              width="34"
              alt=""
              src={img}
            />
          </span>
          {name}
        </strong>
      </ExternalLink>
      <span className="info">{members} members</span>
    </li>
  );
}

export default function Groups() {
  const { name } = useProfile();

  return (
    <div className="module">
      <h2 className="heading">
        <span className="h2Wrapper">
          <ExternalLink href={`http://last.fm/user/${name}/groups`}>
            Groups (1)
          </ExternalLink>
        </span>
      </h2>
      <ul className="groupsSmall">
        <Group
          name="Bring back the old design :-/"
          img="https://lastfm.freetls.fastly.net/i/u/174s/2a96cbd8b46e442fc41c2b86b821562f.png"
          members="Many"
        />
      </ul>
    </div>
  );
}
