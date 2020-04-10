import React from 'react';
import { Helmet } from 'react-helmet';

import ExternalLink from '../../components/ExternalLink';
import { useProfile } from '../../hooks';

const navElements = [
  'library',
  'friends',
  'tracks',
  'albums',
  'charts',
  'neighbours',
  'events',
  'groups',
  'journal',
  'library/tags',
];

const upperCaseFirstCharacter = (str) =>
  str.charAt(0).toUpperCase() + str.substr(1);

export default function ProfileHeader() {
  const { name } = useProfile();

  return (
    <>
      {name && (
        <Helmet>
          <title>{name}'s Music Profile - Users at Last.fm</title>
        </Helmet>
      )}
      <header className="page-head without-crumbtrail without-image clearit separated">
        <h1>{name} </h1>

        <nav className="secondary-nav" role="navigation">
          <ul className="visible-menu">
            {navElements.map((url, index) => {
              const title = upperCaseFirstCharacter(
                url.includes('/') ? url.split('/')[1] : url,
              );

              return (
                <li className={index === 0 ? 'first' : undefined} key={url}>
                  <ExternalLink href={`http://last.fm/user/${name}/${url}`}>
                    {title}
                  </ExternalLink>
                </li>
              );
            })}
          </ul>
          <div className="drop-down-menu more">
            <span className="menu-toggle">More…</span>
            <ul className="hidden-menu"></ul>
          </div>
        </nav>
      </header>
    </>
  );
}
