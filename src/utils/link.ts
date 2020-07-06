export const createArtistUrl = (artist: string) =>
  `https://last.fm/music/${artist}`;
export const createTrackUrl = (base: string, track: string) =>
  [base, track].join('/_/');
