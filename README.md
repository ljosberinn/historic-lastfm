[![Netlify Status][netlify-image] ][netlify-url]
[![dependencies][dependencies-image] ][dependencies-url]
[![devdependencies][devdependencies-image] ][devdependencies-url]

[dependencies-image]: https://david-dm.org/ljosberinn/historic-lastfm.png
[dependencies-url]: https://david-dm.org/ljosberinn/historic-lastfm
[devdependencies-image]: https://david-dm.org/ljosberinn/historic-lastfm/dev-status.png
[devdependencies-url]: https://david-dm.org/ljosberinn/historic-lastfm#info=devDependencies
[netlify-image]: https://api.netlify.com/api/v1/badges/00cd3573-9deb-4cd9-90a8-0bc80de00d6f/deploy-status
[netlify-url]: https://app.netlify.com/sites/historic-lastfm/deploys

# Why

- last.fm is a platform I actively used a lot between 2010 and 2013
- lots of good memories, interactions and actual real-life friendships were formed back then, because of the platform - shoutout to [Tod_nach_Noten](https://last.fm/user/Tod_nach_Noten), [Fleischart](https://last.fm/user/Fleischart), [Argarath](https://last.fm/user/Argarath), [BlackSalvation](https://last.fm/user/BlackSalvation) & [Goettersterben](https://last.fm/user/Goettersterben)
- back then, having a last.fm account was more or less a given in the current 18-30year olds german Black Metal scene
- nearly all of my friends had accounts too, some of which used the site on a regular basis too, so it definitely filled a need
- this design is gone, sadly. It was replaced at some point after which effectively led to the current state of the site: a slow death, after it's been robbed of some of the features
- the new/current design was heavily critized (tells a lot that on the first page of google results for `lastfm design` are already 2 links critizing it)

# How

- nearly exclusively made possible through source inspection of the [Wayback Machine](https://web.archive.org/web/20130605105804/http://last.fm/user/xhs207ga)
- unecessary CSS (as the source CSS includes staging, IE6 fixes and a lot of unrelated other CSS for a profile) has been stripped

# Technologies

## Host

- Netlify

## Backend

- [Netlify Functions](https://www.netlify.com/products/functions/)

## SEO

- [react-helmet](https://github.com/nfl/react-helmet)

## Misc

- [react-router](https://reacttraining.com/react-router/web/guides/quick-start)

# Requirements

- [Node.js](https://nodejs.org/en/)
- preferably [yarn](https://yarnpkg.com/en/)
- preferably [VSCode](https://code.visualstudio.com/insiders/)
- you need an [API key from last.fm](https://www.last.fm/api/account/create) to get data

# Development
```bash
git clone https://github.com/ljosberinn/historic-lastfm
cd historic-lastfm
cp .env.example .env
# edit .env
yarn install
code .
```
