import React, {useEffect, useMemo} from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

const SearchControl = ({ companyAdd }) => {
   
  const englishCities = useMemo(() => [
    {
      "București" : "Bucharest",
      "Iași" : "Iasi",
      "Timișoara" : "Timisoara",
      "Brașov" : "Brasov",
      "Constanța" : "Constanta",
      "Galați" : "Galati",
    }
  ], [])

  const map = useMap();
  useEffect(() => {
    if (companyAdd) {

      const parts = companyAdd.split(',');
      const cityName = parts.length > 1 ? parts[1].trim() : '';
      const searchCityName = englishCities[cityName] || cityName;
      const searchQuery = `${searchCityName}, Romania`;

      const provider = new OpenStreetMapProvider();
      provider.search({ query: searchQuery }).then((results) => {
        if (results.length > 0) {
          const { x, y } = results[0];
          map.setView([y, x], 16); 
          L.marker([y, x]).addTo(map).bindPopup(companyAdd).openPopup();
        }
      });
    }
  }, [map, companyAdd, englishCities]);

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

