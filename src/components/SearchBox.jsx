import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchCities } from '../api/CitiesApiHandler';

const SearchBox = ({ inputValue, setInputValue, setSelectedCity, disabled }) => {
  const [cities, setCities] = useState([]);

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

  const handleOnChange = (value) => {
    if(typeof value === 'string'){
      setSelectedCity(value);
      setInputValue(value);
    }
    else if(value && value.name){
      setSelectedCity(value.name);
      setInputValue(value.name);
    }
    else{
      setSelectedCity('');
      setInputValue('');
    }
  }

  return (
    <Autocomplete
      sx={{ width: 600 }}
      freeSolo
      options={cities.map((city) => city.name)}
      value={inputValue}
      onChange={(event, newValue) => handleOnChange(newValue)}
      disabled={disabled}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label="Search for a city..." />
      )}
    />
  );
};

export default SearchBox;