export default (state, action) => {
  switch (action.type) {
    case 'SEARCH_ARTISTS':
      return { ...state, artists: action.payload };
    case 'GET_ALBUMS':
      return { ...state, albums: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_NOFOUND':
      return { ...state, noFound: action.payload };
    case 'CLEAR_ARTIST_N_ALBUM':
      return { ...state, artists: [], albums: [] };
    default:
      return state;
  }
};
