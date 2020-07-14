import React, { useEffect, useContext } from 'react';
import AlbumItem from './AlbumItem';
import Spinner from '../layout/Spinner';
import { GlobalContext } from '../../context/GlobalState';

const Albums = ({ match }) => {
  const { getAlbums, albums, loading } = useContext(GlobalContext);
  useEffect(() => {
    getAlbums(match.params.album);
  }, []);

  return (
    <>
      {albums === false && <p>nothing</p>}
      {loading ? (
        <Spinner />
      ) : (
        <>
          {albums.length > 0 ? (
            <>
              <h3>{match.params.album}'s Top Albums</h3>
              <div className="grid-3">
                {albums.map((album) => (
                  <AlbumItem key={album.name} album={album} />
                ))}
              </div>
            </>
          ) : (
            <h3>No albums found</h3>
          )}
        </>
      )}
    </>
  );
};

export default Albums;
