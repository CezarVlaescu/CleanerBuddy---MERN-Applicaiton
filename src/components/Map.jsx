import React, {useEffect} from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

const SearchControl = ({ companyAdd }) => {
  const map = useMap();
  useEffect(() => {
    if (companyAdd) {
      const provider = new OpenStreetMapProvider();
      const testAddress = "1600 Amphitheatre Parkway, Mountain View, CA";
      provider.search({ query: companyAdd }).then((results) => {
        console.log(results);
        if (results.length > 0) {
          const { x, y } = results[0];
          map.setView([y, x], 16); 
          L.marker([y, x]).addTo(map).bindPopup(companyAdd).openPopup();
        }
      });
    }
  }, [map, companyAdd]);

  return null;
};

const Map = ({ companyAdd }) => {
  const position = [45.9432, 24.9668]; 

  return (
    <MapContainer center={position} zoom={7} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <SearchControl companyAdd={companyAdd} />
    </MapContainer>
  );
};

export default Map;

