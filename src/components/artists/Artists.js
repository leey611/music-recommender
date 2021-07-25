import React, { useContext } from 'react';
import ArtistItem from './ArtistItem';
import Spinner from '../layout/Spinner';
import { GlobalContext } from '../../context/GlobalState';

const Artists = () => {
  const { artists, loading, noFound } = useContext(GlobalContext);
  return (
    <>
      {noFound === 'noinput' && <p>Please enter an artist :(</p>}
      {!loading && noFound === false && !artists.length && (
        <p>Oops! No results found:(</p>
      )}
      {!loading && noFound && noFound !== 'noinput' && (
        <p>Oops! Can't find this artist:(</p>
      )}
      {loading ? (
        <Spinner />
      ) : (
        // <>
        //   {noFound == true && artists.length > 0 ? (
        //     <>
        //       <h3>Similar Artists:</h3>
        //       <div className="grid-3">
        //         {artists.map((artist) => (
        //           <ArtistItem artist={artist} key={artists.name} />
        //         ))}
        //       </div>
        //     </>
        //   ) : (
        //     <div>notfound</div>
        //   )}
        // </>

        <>
          {!noFound && artists.length > 0 && <h3>Similar Artists: </h3>}
          <div className="grid-3">
            {artists.map((artist) => (
              <ArtistItem artist={artist} key={artist.name} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Artists;
