import React from 'react';

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
                {title.charAt(0).toUpperCase() + title.substr(1)}
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
            <img
              className="transparent_png globe_icon icon"
              alt="Change language"
              width="11"
              height="11"
              src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/clear.gif"
            />{' '}
            <span>English</span>
          </ExternalLink>{' '}
          | <ExternalLink href="http://last.fm/help">Help</ExternalLink>
        </div>

        <form
          id="siteSearch"
          method="get"
          action="http://last.fm/search"
          className="search-autocomplete"
          role="search"
        >
          <input
            id="siteSearchBox"
            type="text"
            name="q"
            autoCorrect="off"
            autoComplete="off"
            placeholder="Music search"
            size="26"
            className="js-search"
          />
          <div
            id="siteSearchProgress"
            className="js-search-progress search-progress ir"
            style={{ display: 'none' }}
          >
            Loading
          </div>
          <input type="hidden" name="from" value="ac" />
          <button
            id="siteSearchSubmit"
            type="submit"
            className="submit"
            title="Search"
          ></button>
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
