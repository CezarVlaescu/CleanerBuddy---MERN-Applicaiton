import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import useGetCities from '../hooks/useGetCities';

const SearchBox = ({ inputValue, setInputValue, setSelectedCity, disabled }) => {
  const { cities, isLoading, error } = useGetCities();

  if (isLoading) return <p>Loading cities...</p>;
  if (error) return <p>Error fetching cities: {error}</p>;

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