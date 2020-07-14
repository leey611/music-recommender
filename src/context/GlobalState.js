import React, { useReducer, createContext } from 'react';
import GlobalRecuder from './GlobalReducer';

let lastFmClientKey;
let lastFmClientSecret;

if (process.env.NODE_ENV !== 'production') {
  lastFmClientKey = process.env.REACT_APP_CLIENT_KEY;
  lastFmClientSecret = process.env.REACT_APP_CLIENT_SECRET;
} else {
  lastFmClientKey = process.env.CLIENT_KEY;
  lastFmClientSecret = process.env.CLIENT_SECRET;
}

const initialState = {
  artists: [],
  albums: [],
  loading: false,
  noFound: null
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(GlobalRecuder, initialState);

  //search artists
  const searchArtists = async (text) => {
    const lastFmBaseUrl = 'https://ws.audioscrobbler.com/2.0/';
    if (text === '') {
      setNoFound('noinput');
      dispatch({ type: 'CLEAR_ARTIST_N_ALBUM' });
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${lastFmBaseUrl}?method=artist.getsimilar&artist=${text}&api_key=${lastFmClientKey}&format=json`
      );
      const resJson = await res.json();
      const data = await resJson.similarartists.artist;

      dispatch({ type: 'SEARCH_ARTISTS', payload: data });

      //setArtists(data);
      setNoFound(false);
      setLoading(false);
    } catch (err) {
      //setArtists([]);
      setNoFound(true);
      setLoading(false);
      dispatch({ type: 'CLEAR_ARTIST_N_ALBUM' });
      console.log(err);
    }
  };

  //get albums
  const getAlbums = async (artistname) => {
    const lastFmBaseUrl = 'https://ws.audioscrobbler.com/2.0/';
    try {
      setLoading(true);
      const res = await fetch(
        `${lastFmBaseUrl}?method=artist.gettopalbums&artist=${artistname}&api_key=${lastFmClientKey}&format=json`
      );
      const resJson = await res.json();

      const data = await resJson.topalbums.album;

      dispatch({ type: 'GET_ALBUMS', payload: data });
      //setAlbums(data);
      setLoading(false);
      console.log('set', data);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  //set loading
  const setLoading = (trueOrFalse) =>
    dispatch({ type: 'SET_LOADING', payload: trueOrFalse });

  //set no found
  const setNoFound = (noFound) =>
    dispatch({ type: 'SET_NOFOUND', payload: noFound });

  return (
    <GlobalContext.Provider
      value={{
        artists: state.artists,
        albums: state.albums,
        loading: state.loading,
        noFound: state.noFound,
        searchArtists,
        getAlbums,
        setLoading,
        setNoFound
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
