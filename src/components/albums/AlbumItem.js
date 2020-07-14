import React from 'react';

const AlbumItem = ({ album }) => {
  const { name, image, playcount } = album;
  //console.log(props);
  return (
    <>
      {image[2]['#text'] !== '' && (
        <div>
          <div className="single-team">
            <img src={image[2]['#text']} alt={name} />

            <div className="team-text">
              <h2>{name}</h2>
              <div>{playcount} Hits</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlbumItem;
