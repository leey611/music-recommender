import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Link to="/">
      <div className="navbar">
        <h1>Music Recommender</h1>
      </div>
    </Link>
  );
};

export default Header;
