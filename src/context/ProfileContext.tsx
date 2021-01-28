import type { ReactNode } from 'react';
import { createContext } from 'react';

export type Friend = {
  country: string;
  img: string;
  name: string;
  subscriber: boolean;
};

export type Track = {
  artist: string;
  id: string;
  img: string;
  track: string;
  timestamp: number;
};

export enum Timespan {
  '7day' = '7day',
  '1month' = '1month',
  '3month' = '3month',
  '6month' = '6month',
  '12month' = '12month',
  'overall' = 'overall',
}

export type TopArtists = {
  [key in keyof typeof Timespan]: {
    img: string;
    name: string;
    playCount: number;
  }[];
};

export type TopTracks = {
  [key in keyof typeof Timespan]: {
    artist: string;
    track: string;
    playCount: number;
  }[];
};

export type Profile = {
  country: string;
  registered: number;
  totalPlayCount: string;
  totalArtistAmount: string;
  playlists: number;
  name: string;
  realName: string;
  subscriber: boolean;
  img: string;
  friends: Friend[];
  lovedTracks: Track[];
  recentTracks: Track[];
  topArtists: TopArtists;
  topTracks: TopTracks;
};

export const initialState: Profile = {
  country: 'Germany',
  friends: [],
  img: '',
  lovedTracks: [],
  name: 'XHS207GA',
  playlists: 0,
  realName: 'G. M. A. A.',
  recentTracks: [],
  registered: 0,
  subscriber: false,
  topArtists: {
    [Timespan['12month']]: [],
    [Timespan['7day']]: [],
    [Timespan['1month']]: [],
    [Timespan['3month']]: [],
    [Timespan['6month']]: [],
    [Timespan.overall]: [],
  },
  topTracks: {
    [Timespan['12month']]: [],
    [Timespan['7day']]: [],
    [Timespan['1month']]: [],
    [Timespan['3month']]: [],
    [Timespan['6month']]: [],
    [Timespan.overall]: [],
  },
  totalArtistAmount: '0',
  totalPlayCount: '0',
};

export const ProfileContext = createContext<Profile>(initialState);

type ProfileContextProviderProps = {
  children: ReactNode;
  value: Profile;
};

export function ProfileContextProvider({
  children,
  value = initialState,
}: ProfileContextProviderProps): JSX.Element {
  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}
