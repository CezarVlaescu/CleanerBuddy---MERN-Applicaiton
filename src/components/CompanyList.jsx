import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { sortCompanies } from "../utils/sortUtil";
import useGetCompanies from "../hooks/useGetCompanies";

const CompanyList = ({ selectedCity, onSelectCompany }) => {

  const { companies, isLoading, error } = useGetCompanies();
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [sortKey, setSortKey] = useState("name");

  useEffect(() => {
    if (selectedCity) {
      const filterCompanies = companies.filter(
        (company) => company.city.name === selectedCity
      );
      setFilteredCompanies(filterCompanies);
    } else {
      setFilteredCompanies([]);
    }
  }, [selectedCity, companies]);

  const filteredAndSortedCompanies = sortCompanies(filteredCompanies, sortKey);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Box sx={{ mb: 2 }}>
        <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <option value="name">Name</option>
          <option value="address">Location</option>
          <option value="rating">Rating</option>
        </select>
      </Box>
      {filteredAndSortedCompanies.map((company) => (
        <Card key={company._id} sx={{ mb: 2 }}>
          <CardActionArea onClick={() => onSelectCompany(company._id)}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {company.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Address: {company.address}
              </Typography>
              <Typography variant="body2">Contact: {company.phone}</Typography>
              <Typography variant="body2">
                Rating: {company.rating} / 5
              </Typography>
              <Typography variant="body2">
                City: {company.city?.name}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default CompanyList;
