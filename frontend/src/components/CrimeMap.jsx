// CrimeMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const CrimeMap = () => {
  const position = [19.7515, 75.7139]; // Maharashtra coordinates

  return (
    <MapContainer center={position} zoom={6} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }} className='z-1'>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {/* Mocked marker for demonstration */}
      <Marker position={position}>
        <Popup>A crime occurred here.</Popup>
      </Marker>
    </MapContainer>
  );
};

export default CrimeMap;
