import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import Favorites from './components/Favorites';
import NotFound from './components/NotFound';
import Song from './components/Song';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { StateProvider } from './state';

function App() {

  const initialState = {
    title: "",
    order: "",
    musics: []
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'onTitle':
        return {
          ...state,
          title: action.newTitle
        };
      case 'onOrder':
        return {
          ...state,
          order: action.newOrder
        };
      case 'onMusics':
        return {
          ...state,
          musics: action.newMusics
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container">
            <Link to="/onzer" className="navbar-brand mb-0 h1">
              <img src={logo} alt="React Logo" width="42" /> Onzer
            </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/onzer" className="nav-link">
                    <i className="fas fa-search"></i> Rechercher un titre
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/onzer/favorites" className="nav-link">
                    <i className="fas fa-heartbeat"></i> Mes favoris
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route
            path='/onzer' exact render={() => <Home />}
          />
          <Route path="/onzer/favorites" component={Favorites} />
          <Route path="/onzer/song/:id" component={Song} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </StateProvider>
  );
}

export default App;
