import React, { Fragment, useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import spinner from '../layout/spinner.gif';
import { GlobalContext } from '../../context/GlobalState'

let lastFmClientKey;
let lastFmClientSecret;

if (process.env.NODE_ENV !== 'production') {
  lastFmClientKey = process.env.REACT_APP_CLIENT_KEY;
  lastFmClientSecret = process.env.REACT_APP_CLIENT_SECRET;
} else {
  lastFmClientKey = process.env.CLIENT_KEY;
  lastFmClientSecret = process.env.CLIENT_SECRET;
}

const ArtistItem = ({ artist }) => {
  const [artistImg, setArtistImg] = useState('')
  const lastFmBaseUrl = 'https://ws.audioscrobbler.com/2.0/';

  useEffect(() => {
    if (document.getElementById(artist.name)) {
      fetch(
        'https://intense-waters-50948.herokuapp.com/albums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: artist.name
        })
      })
        .then((res) => res.json())
        .then((jsonRes) => {
            if (
              jsonRes &&
              jsonRes.album[0].image &&
              jsonRes.album[0].image[2]['#text'] !== ''
            ) {
              setArtistImg(jsonRes.album[0].image[2]['#text'])

            } else {
              setArtistImg(artist.image[2]['#text'])
            }
        })
        .catch((err) => {
          setArtistImg(artist.image[2]['#text'])
          console.log(err);
        });
    }
  }, []);

  let { name, imgLink, match } = artist;

  return (
    <Fragment>
      {Number(match) > 0.45 && (
        <Link to={`/albums/${name}`}>
          <div className="single-team">
            <img id={name} src={artistImg ? artistImg : spinner} alt={name} />
            <div className="team-text">
              <h2>{name}</h2>
              <div>{Math.floor(Number(match) * 100)}% Match</div>
            </div>
          </div>
        </Link>
      )}
    </Fragment>
  );
};

export default ArtistItem;
