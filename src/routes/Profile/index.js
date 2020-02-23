import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React, { useState, useEffect, createContext } from 'react';
import { useParams } from 'react-router-dom';

import { createFrontendUrl } from '../../utils/api';
import AboutMe from './AboutMe';
import Friends from './Friends';
import Library from './Library';
import ProfileBadge from './ProfileBadge';
import ProfileHeader from './ProfileHeader';
import ProfileOptions from './ProfileOptions';
import RecentActivity from './RecentActivity';
import RecentlyListenedTracks from './RecentlyListenedTracks';
import TopArtists from './TopArtists';

export const ProfileContext = createContext(null);

dayjs.extend(relativeTime);

const initialState = {
  name: undefined,
  recentTracks: [],
  lovedTracks: [],
  country: undefined,
  realName: undefined,
  registered: undefined,
  totalPlayCount: undefined,
  img: undefined,
  subscriber: false,
  playlists: undefined,
  topArtists: {
    overall: [],
    '7days': [],
    '1month': [],
    '3month': [],
    '6month': [],
    '12month': [],
  },
  friends: [],
};

export default function Profile() {
  const { name } = useParams();

  const [profile, setProfile] = useState(initialState);

  useEffect(() => {
    Promise.all([
      fetch(createFrontendUrl('getInfo', { name })),
      fetch(createFrontendUrl('getRecentTracks', { name })),
      fetch(createFrontendUrl('getLovedTracks', { name })),
      fetch(createFrontendUrl('getFriends', { name })),
      fetch(createFrontendUrl('getTopArtists', { name })),
    ])

      .then(responses =>
        Promise.all(responses.map(response => response.json())),
      )

      .then(([info, recentTracks, lovedTracks, friends, topArtists]) => {
        setProfile({
          recentTracks,
          lovedTracks,
          friends,
          topArtists,
          ...info,
        });
      })
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
        </div>
      </div>
      <div className="mpuTop rightCol">
        <AboutMe />
        <RecentActivity />
        <Friends />
      </div>
    </ProfileContext.Provider>
  );
}
