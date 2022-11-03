import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './Pages/Login';
import GamePage from './Pages/Game';
import Settings from './Pages/Settings';
import Feedback from './Pages/Feedback';
import Ranking from './Pages/Ranking';

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ GamePage } />
        <Route path="/settings" component={ Settings } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}

/* <img src={ logo } className="App-logo" alt="logo" /> */
