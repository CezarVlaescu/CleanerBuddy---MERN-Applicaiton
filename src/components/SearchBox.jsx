import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchCities } from '../api/CitiesApiHandler';

const SearchBox = () => {
  const [cities, setCities] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const getCities = async () => {
      try {
        const citiesData = await fetchCities();
        setCities(citiesData);
      } catch (err) {
        console.error("Failed fetching cities", err);
      }
    };

    getCities();
  }, []);

  return (
    <Autocomplete
      sx={{ width: 500 }}
      freeSolo
      options={cities.map((city) => city.name)} 
      value={inputValue}
      onChange={(event, newValue) => {
        setInputValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for a city..."
          InputProps={{
            ...params.InputProps,
          }}
        />
      )}
    />
  );
};

export default SearchBox;