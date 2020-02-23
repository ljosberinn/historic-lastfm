import React from 'react';

import ExternalLink from './ExternalLink';

const legalLinks = [
  { url: 'last.fm/about', title: 'About' },
  { url: 'blog.last.fm', title: 'Blog' },
  { url: 'last.fm/about/contact', title: 'Contact us' },
  { url: 'last.fm/about/jobs', title: 'Jobs' },
  { url: 'last.fm/resources', title: 'Logo & badges' },
  { url: 'last.fm/advertise', title: 'Advertise' },
  { url: 'last.fm/legal', title: 'Legal' },
];

const joinLinks = [
  { url: 'join', title: 'Sign up' },
  { url: 'community/users', title: 'Find people' },
  { url: 'community/groups', title: 'Find groups' },
  { url: 'forum', title: 'Forums' },
];

const doMoreLinks = [
  {
    url: 'last.fm/download',
    title: 'The Scrobbler',
    textContent: 'Download Scrobbler',
  },
  {
    url: 'last.fm/hardware/ios',
    title: 'The iOS Scrobbler',
    textContent: 'Scrobbler for iOS',
  },
  {
    url: 'last.fm/hardware/apple',
    title: undefined,
    textContent: 'iPhone app',
  },
  { url: 'last.fm/hardware', title: undefined, textContent: 'More apps' },
  { url: 'playground.last.fm', title: undefined, textContent: 'Playground' },
  {
    url: 'build.last.fm',
    title: undefined,
    textContent: 'Tools, plugins &amp; more',
  },
  { url: 'last.fm/api', title: undefined, textContent: 'Last.fm API' },
];

export default function Footer() {
  return (
    <footer role="banner" className="site-footer">
      <div className="responsive-container">
        <nav className="site-footer-nav">
          <div className="r add-bottom-margin">
            <ExternalLink
              href="http://last.fm/uploadmusic"
              className="g6 call-to-action call-to-action--upload"
            >
              <div>
                <h2>Artists and Labels</h2>
                <p>Upload your music and connect with 40 million music fans</p>
              </div>
            </ExternalLink>
            <ExternalLink
              href="http://last.fm/download"
              className="g6 call-to-action call-to-action--download"
            >
              <div>
                <h2>Download Desktop App</h2>
                <p>
                  Get the desktop app for Windows, Mac, or Linux and start
                  scrobbling
                </p>
              </div>
            </ExternalLink>
          </div>
          <hr className="separator" />
          <ul className="r add-bottom-margin">
            <li className="g3">
              <h2>Find out more</h2>
              <ul>
                {legalLinks.map(({ url, title }) => (
                  <li key={url}>
                    <ExternalLink href={`http://${url}`}>{title}</ExternalLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="g3">
              <h2>Join in</h2>
              <ul>
                {joinLinks.map(({ url, title }) => (
                  <li key={url}>
                    <ExternalLink href={`http://last.fm/${url}`}>
                      {title}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="g3">
              <h2>Do more</h2>
              <ul>
                {doMoreLinks.map(({ url, title, textContent }) => (
                  <li key={url}>
                    <ExternalLink href={`http://${url}`} title={title}>
                      {textContent}
                    </ExternalLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="g3">
              <h2>Get help</h2>
              <ul>
                <li>
                  <ExternalLink href="http://last.fm/help">
                    Help &amp; support
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href="http://status.last.fm/">
                    System status
                  </ExternalLink>
                </li>
              </ul>
              <h2 className="add-top-margin">Even more…</h2>
              <ul>
                <li>
                  <ExternalLink href="http://last.fm/music/+free-music-downloads">
                    Free music downloads
                  </ExternalLink>
                </li>
                <li>
                  <ExternalLink href="http://musicmanager.last.fm/">
                    Music Manager
                  </ExternalLink>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
        <hr className="separator" />
        <div className="media site-footer-legalese">
          <img
            src="https://web.archive.org/web/20130605105804im_/http://cdn.last.fm/flatness/anon-homepage/footer_as.png"
            className="media-pull-right"
            width="50"
            height="30"
            alt="Watch Out, There's a Last.fm About."
          />
          <div className="media-body">
            <blockquote className="site-footer-legalese-strapline">
              “Watch Out, There's a Last.fm About.”
            </blockquote>

            <p>
              © 2013 Last.fm Ltd. All rights reserved. |
              <ExternalLink href="http://last.fm/legal/terms">
                Terms of Use
              </ExternalLink>
              ,
              <ExternalLink href="http://last.fm/legal/privacy">
                Privacy Policy
              </ExternalLink>{' '}
              and
              <ExternalLink href="http://last.fm/legal/cookies">
                Cookie Policy
              </ExternalLink>{' '}
              -<span className="date">Updated 15 Jan 2013</span>
            </p>
          </div>
        </div>
        <div id="cbsi_f">
          <form>
            <div>
              <label className="rb_visit_txt" for="cbsi_footer_menu">
                Visit other Sites
              </label>
              <select
                name="cbsi_footer_menu"
                id="cbsi_footer_menu"
                className="rb_visit_sel"
              >
                <option value="">Select Site</option>
                <option value="http://www.bnet.com">BNET</option>
                <option value="http://www.cbscares.com">CBS Cares</option>
                <option value="http://www.cbsfilms.com">CBS Films</option>
                <option value="http://www.cbsradio.com/streaming/index.html">
                  CBS Radio
                </option>
                <option value="http://www.cbs.com">CBS.com</option>
                <option value="http://www.cbsinteractive.com">
                  CBSInteractive
                </option>
                <option value="http://www.cbsnews.com">CBSNews.com</option>
                <option value="http://www.cbssports.com">CBSSports.com</option>
                <option value="http://www.chow.com">CHOW</option>
                <option value="http://www.cnet.com">CNET</option>
                <option value="http://collegenetwork.cbssports.com">
                  College Network
                </option>
                <option value="http://findarticles.com">Find Articles</option>
                <option value="http://www.gamespot.com">GameSpot</option>
                <option value="http://www.help.com">Help.com</option>
                <option value="http://www.last.fm">Last.fm</option>
                <option value="http://www.maxpreps.com">MaxPreps</option>
                <option value="http://www.metacritic.com">
                  Metacritic.com
                </option>
                <option value="http://moneywatch.bnet.com">Moneywatch</option>
                <option value="http://www.mysimon.com">mySimon</option>
                <option value="http://www.radio.com">Radio.com</option>
                <option value="http://www.search.com">Search.com</option>
                <option value="http://www.shopper.com">Shopper.com</option>
                <option value="http://www.sho.com">Showtime</option>
                <option value="http://www.smartplanet.com">SmartPlanet</option>
                <option value="http://www.techrepublic.com">
                  TechRepublic
                </option>
                <option value="http://www.theinsider.com">The Insider</option>
                <option value="http://www.tv.com">TV.com</option>
                <option value="http://www.urbanbaby.com">UrbanBaby.com</option>
                <option value="http://www.zdnet.com">ZDNet</option>
              </select>
              <input type="button" className="rb_visit_go" value="Go" />
            </div>
          </form>
        </div>{' '}
      </div>
    </footer>
  );
}
