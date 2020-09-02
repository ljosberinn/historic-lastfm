export const createArtistUrl = (artist: string): string =>
  `https://last.fm/music/${artist}`;
export const createTrackUrl = (base: string, track: string): string =>
  [base, track].join('/_/');
