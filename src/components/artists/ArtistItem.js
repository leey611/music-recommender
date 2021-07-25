import React, { Fragment, useEffect, useContext } from 'react';
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
  const lastFmBaseUrl = 'https://ws.audioscrobbler.com/2.0/';

  useEffect(() => {
    fetch(
      'https://intense-waters-50948.herokuapp.com/albums', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text: artist.name
      })
    }
      // `${lastFmBaseUrl}?method=artist.gettopalbums&artist=${artist.name}&api_key=${lastFmClientKey}&format=json`
    )
      .then((res) => res.json())
      .then((jsonRes) => {
        if (document.getElementById(artist.name)) {
          if (
            jsonRes &&
            jsonRes.album[0].image &&
            jsonRes.album[0].image[2]['#text'] !== ''
          ) {
            document.getElementById(artist.name).src =
              jsonRes.album[0].image[2]['#text'];
          } else {
            document.getElementById(artist.name).src = artist.image[2]['#text'];
          }
        }
      })
      .catch((err) => {
        if (document.getElementById(artist.name)) {
          document.getElementById(artist.name).src = artist.image[2]['#text'];
        }

        console.log(err);
      });
  }, []);

  let { name, imgLink, match } = artist;

  return (
    <Fragment>
      {Number(match) > 0.45 && (
        <Link to={`/albums/${name}`}>
          <div className="single-team">
            {/* <img id={name} src={artist.image[2]['#text']} alt={name} /> */}
            <img id={name} src={spinner} alt={name} />
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
