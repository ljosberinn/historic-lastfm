export const createArtistUrl = artist => `https://last.fm/music/${artist}`;
export const createTrackUrl = (base, track) => [base, track].join('_');
