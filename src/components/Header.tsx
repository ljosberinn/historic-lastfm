import { useRouter } from 'next/router';
import React, { useState } from 'react';

import ExternalLink from './ExternalLink';

const navElements = [
  'music',
  'listen',
  'radio',
  'events',
  'charts',
  'community',
];

export default function Header() {
  const { push } = useRouter();

  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);

    push(`/user/${search}`);

    setTimeout(() => {
      setLoading(false);
      setSearch('');
    }, 2000);
  }

  function handleChange({ target: { value } }) {
    setSearch(value);
  }

  return (
    <div id="header" className="clearit responsive-container" role="banner">
      <div id="headerWrapper">
        <ExternalLink href="http://last.fm/" id="lastfmLogo">
          Last.fm
        </ExternalLink>

        <ul id="primaryNav" role="navigation">
          {navElements.map(title => (
            <li id={`{title}Nav`} className="navItem" key={title}>
              <ExternalLink
                href={`http://last.fm/${title}`}
                className="nav-link"
              >
                {title.charAt(0).toUpperCase() + title.slice(1)}
              </ExternalLink>
            </li>
          ))}
          <li id="originalsNav" className="navItem">
            <ExternalLink href="http://originals.last.fm/" className="nav-link">
              Originals
            </ExternalLink>
          </li>
        </ul>

        <div id="profileLinks">
          <ul>
            <li id="loginLink" className="profileItem">
              <ExternalLink
                href="http://last.fm/login"
                className="profile-link"
              >
                <strong>Login</strong>
              </ExternalLink>
            </li>
            <li id="signupLink" className="profileItem">
              <ExternalLink href="http://last.fm/join" className="profile-link">
                <strong>Join</strong>
              </ExternalLink>
            </li>
          </ul>
        </div>
        <div id="headerLinks">
          <ExternalLink
            title="Click here to change your language"
            id="headerLangToggle"
            className="icon toggle"
          >
            <span>English</span>
          </ExternalLink>{' '}
          | <ExternalLink href="http://last.fm/help">Help</ExternalLink>
        </div>

        <form
          id="siteSearch"
          className="search-autocomplete"
          role="search"
          onSubmit={handleSubmit}
        >
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <input
            id="siteSearchBox"
            type="text"
            name="q"
            autoCorrect="off"
            autoComplete="off"
            placeholder="Profile search"
            size={26}
            className="js-search"
            onChange={handleChange}
            value={search}
            disabled={loading}
          />
          <div
            id="siteSearchProgress"
            className="js-search-progress search-progress ir"
            style={{ display: loading ? 'block' : 'none' }}
          >
            Loading
          </div>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            id="siteSearchSubmit"
            type="submit"
            className="submit"
            title="Search"
          />
        </form>
        <div id="headerPromo">
          <ExternalLink href="http://last.fm/about/jobs">
            Come work with us! Last.fm is hiring »
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
