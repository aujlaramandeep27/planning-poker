import React from 'react';
import { Link } from 'react-router-dom';

export default function Rooms() {
  const rooms = [
    { 'href': '/room/A', 'label': 'A' },
    { 'href': '/room/B', 'label': 'B' },
    { 'href': '/room/C', 'label': 'C' },
  ];

  return (
    <>
      <h1>Rooms</h1>
      <div className="uk-container">
        { rooms.map((room, index) =>
          <div className="uk-margin" key={index}>
            <Link to={room.href} className="uk-button uk-button-default uk-width-1-1">
              {room.label}
            </Link>
          </div>
        )}
      </div>
    </>
  );
}