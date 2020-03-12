import React from 'react';
import logo from './logo.svg';
import './App.css';
import fetchJsonp from 'fetch-jsonp';
import Home from './components/Home';
import Favorites from './components/Favorites';
import NotFound from './components/NotFound';
import Song from './components/Song';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { StateProvider } from './state';

// const songs = fetchJsonp(`http://api.deezer.com/chart/0?access_token=friHRKNCzRXwEnsAyMZg7J6D98TSSTqJGas7PqtAzj5m68vC8xP&output=jsonp`)
//   .then((response) => response.json())
//   .then(response => response.tracks.data)
//   .then(musics => console.log(musics))
//   .catch((ex) => console.log('parsing failed', ex))

// https://connect.deezer.com/oauth/auth.php?app_id=399044&redirect_uri=http://localhost:3000&perms=basic_access,email

// if (window.location.search !== "") {
//   const [param, code] = window.location.search.split('=')
//   if (param === "?code") {
//     window.localStorage.setItem('onzer.code', code)
//     fetchJsonp(`https://connect.deezer.com/oauth/access_token.php?app_id=399044&secret=4f0a99159b34bc5e84fd41f0dc17d168&code=${code}`)
//       .then((response) => response.json())
//       .then(response => console.log(response))
//   }
//   console.log(param, code)
// }


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
            <Link to="/" className="navbar-brand mb-0 h1">
              <img src={logo} alt="React Logo" width="42" /> Onzer
          </Link>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link to="/" className="nav-link">
                    <i className="fas fa-search"></i> Rechercher un titre
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/favorites" className="nav-link">
                    <i className="fas fa-heartbeat"></i> Mes favoris
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <Switch>
          <Route
            path='/' exact render={() => <Home />}
          />
          <Route path="/favorites" component={Favorites} />
          <Route path="/song/:id" component={Song} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </StateProvider>
  );
}

export default App;
