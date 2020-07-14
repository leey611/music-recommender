import React, { useState, useContext } from 'react';
import { GlobalContext } from '../../context/GlobalState';

const Search = () => {
  const { searchArtists } = useContext(GlobalContext);
  const [text, setText] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    searchArtists(text);
  };

  const onChange = (e) => setText(e.target.value);

  return (
    <div>
      <form onSubmit={onSubmit} id="searchForm">
        <label>I like to listen to</label>
        <div id="searchBar">
          <input
            id="userInput"
            type="text"
            autoComplete="off"
            name="text"
            value={text}
            onChange={onChange}
          />
          <input id="submit" type="submit" value="GO" />
        </div>
      </form>
    </div>
  );
};

export default Search;
