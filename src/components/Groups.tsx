import { useProfile } from '../hooks/useProfile';
import { ExternalLink } from './ExternalLink';

interface GroupProps {
  name: string;
  img: string;
  members: string;
}

function Group({ name, img, members }: GroupProps) {
  return (
    <li className="clearit last">
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

export function Groups(): JSX.Element {
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
