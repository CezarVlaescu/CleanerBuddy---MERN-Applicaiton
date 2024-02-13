import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getCompanies } from "../api/CompaniesApiHandler";

const CompanyList = ({ selectedCity, onSelectCompany }) => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortKey, setSortKey] = useState("name");

  useEffect(() => {
    const getCommpanies = async () => {
      setLoading(true);
      try {
        const data = await getCompanies();
        setCompanies(data);
      } catch (err) {
        console.error("Error getting companies", err);
      } finally {
        setLoading(false);
      }
    };
    getCommpanies();
  }, []);

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

  if (loading) return <p>Loading companies...</p>;

  const sortCompanies = (companies, sortKey) => {
    return companies.slice().sort((a, b) => {
      if (sortKey === "rating") {
        return b[sortKey] - a[sortKey];
      }
      return a[sortKey].localeCompare(b[sortKey]);
    });
  };

  const filteredAndSortedCompanies = sortCompanies(filteredCompanies, sortKey);

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
