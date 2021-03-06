import { useProfile } from '../hooks/useProfile';
import { ExternalLink } from './ExternalLink';

export function ProfileOptions(): JSX.Element {
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
                  loading="lazy"
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
                loading="lazy"
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
                loading="lazy"
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

type TasteometerProps = {
  name: string;
};

function Tasteometer({ name }: TasteometerProps) {
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
