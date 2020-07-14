import React, { useState, useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './components/layout/Header';
import Search from './components/layout/Search';
import Artists from './components/artists/Artists';
import Albums from './components/albums/Albums';
import { GlobalProvider, GlobalContext } from './context/GlobalState';

function App() {
  const {
    searchArtists,
    artists,
    getAlbums,
    albums,
    loading,
    noFound
  } = useContext(GlobalContext);
  // const [artists, setArtists] = useState([]);
  // const [albums, setAlbums] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [noFound, setNoFound] = useState(null);

  //search similar artist
  // const searchArtists = async (text) => {
  //   const lastFmBaseUrl = 'http://ws.audioscrobbler.com/2.0/';
  //   if (text === '') {
  //     return setNoFound('noinput');
  //   }

  //   try {
  //     setLoading(true);
  //     const res = await fetch(
  //       `${lastFmBaseUrl}?method=artist.getsimilar&artist=${text}&api_key=${process.env.REACT_APP_CLIENT_KEY}&format=json`
  //     );
  //     const resJson = await res.json();
  //     const data = await resJson.similarartists.artist;

  //     setArtists(data);
  //     setNoFound(false);
  //     setLoading(false);
  //   } catch (err) {
  //     setNoFound(true);
  //     setLoading(false);
  //     console.log(err);
  //   }
  // };

  //see the similar artist's albums
  // const getAlbums = async (artistname) => {
  //   const lastFmBaseUrl = 'http://ws.audioscrobbler.com/2.0/';
  //   try {
  //     setLoading(true);
  //     const res = await fetch(
  //       `${lastFmBaseUrl}?method=artist.gettopalbums&artist=${artistname}&api_key=${process.env.REACT_APP_CLIENT_KEY}&format=json`
  //     );
  //     const resJson = await res.json();

  //     const data = await resJson.topalbums.album;
  //     setAlbums(data);
  //     setLoading(false);
  //     console.log('set', data);
  //   } catch (err) {
  //     console.log(err);
  //     setLoading(false);
  //   }
  // };

  return (
    <GlobalProvider>
      <Router>
        <div>
          <Header />
          <div className="container">
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <>
                    <Search searchArtists={searchArtists} />
                    <Artists
                      artists={artists}
                      loading={loading}
                      noFound={noFound}
                    />
                  </>
                )}
              ></Route>

              <Route
                exact
                path="/albums/:album"
                render={(props) => (
                  <Albums
                    {...props}
                    getAlbums={getAlbums}
                    albums={albums}
                    loading={loading}
                  />
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    </GlobalProvider>
  );
}

export default App;
