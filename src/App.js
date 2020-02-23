import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { Header, Footer } from './components';
import { Profile } from './routes';

export default function App() {
  return (
    <>
      <div id="fauxHeaderContainer" className="clearit">
        <div id="fauxHeader" />
      </div>

      <div id="page">
        <div className="fiflufi">
          <Header />
          <div
            id="LastAd_leaderboard"
            className="LastAd ad-leaderboard inactive"
          >
            <span />
          </div>
          <div id="content">
            <Switch>
              <Route path="/user/:name" component={Profile} />
              exact />
              <Route render={() => <Redirect to="/user/XHS207GA" />} />
            </Switch>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
