import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';

import { createFrontendUrl } from '../../utils/api';
import AboutMe from './AboutMe';
import Events from './Events';
import Friends from './Friends';
import Groups from './Groups';
import Library from './Library';
import ProfileBadge from './ProfileBadge';
import ProfileHeader from './ProfileHeader';
import ProfileOptions from './ProfileOptions';
import RecentActivity from './RecentActivity';
import RecentlyListenedTracks from './RecentlyListenedTracks';
import Shoutbox from './Shoutbox';
import TopArtists from './TopArtists';
import TopTracks from './TopTracks';

export const ProfileContext = createContext(null);

dayjs.extend(relativeTime);

const initialState = {
  country: undefined,
  friends: [],
  img: undefined,
  lovedTracks: [],
  name: undefined,
  playlists: undefined,
  realName: undefined,
  recentTracks: [],
  registered: undefined,
  subscriber: false,
  topArtists: {
    '12month': [],
    '1month': [],
    '3month': [],
    '6month': [],
    '7days': [],
    overall: [],
  },
  topTracks: {
    '12month': [],
    '1month': [],
    '3month': [],
    '6month': [],
    '7days': [],
    overall: [],
  },
  totalArtistAmount: 0,
  totalPlayCount: undefined,
};

export default function Profile() {
  const { name } = useParams();

  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    const fields = { name };

    Promise.all([
      fetch(createFrontendUrl('getInfo', fields)),
      fetch(createFrontendUrl('getRecentTracks', fields)),
      fetch(createFrontendUrl('getLovedTracks', fields)),
      fetch(createFrontendUrl('getFriends', fields)),
      fetch(createFrontendUrl('getTopArtists', fields)),
      fetch(createFrontendUrl('getTopTracks', fields)),
      fetch(createFrontendUrl('getLibrary', fields)),
    ])
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(responses =>
        Promise.all(responses.map(response => response.json()))
      )
      // eslint-disable-next-line promise/prefer-await-to-then
      .then(
        ([
          info,
          recentTracks,
          lovedTracks,
          friends,
          topArtists,
          topTracks,
          totalArtistAmount,
        ]) => {
          window.scrollTo({ behavior: 'smooth', top: 0 });

          setProfile({
            friends,
            lovedTracks,
            recentTracks,
            topArtists,
            topTracks,
            ...totalArtistAmount,
            ...info,
          });
        }
      )
      // eslint-disable-next-line no-console
      .catch(console.error);
  }, [name]);

  if (!profile.name) {
    return null;
  }

  return (
    <ProfileContext.Provider value={profile}>
      <ProfileHeader />
      <div className="leftCol">
        <div className="leftColWrapper">
          <ProfileBadge />
          <ProfileOptions />
          <RecentlyListenedTracks />
          <Library />
          <TopArtists />
          <TopTracks />
          <Shoutbox />
        </div>
      </div>
      <div className="mpuTop rightCol">
        <AboutMe />
        <RecentActivity />
        <Friends />
        <Events />
        <Groups />
      </div>
    </ProfileContext.Provider>
  );
}
