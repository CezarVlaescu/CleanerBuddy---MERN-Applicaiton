import React, { useState, useEffect } from 'react';
import { getCompanies } from '../api/CompaniesApiHandler';

const CompanyList = ({selectedCity, onSelectCompany}) => {
    const [companies, setCompanies] = useState([]);
    const [filteredCompanies, setFilteredCompanies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sortKey, setSortKey] = useState('name');      

    useEffect(() => {
        const getCommpanies = async () => {
            setLoading(true);
            try{
                const data = await getCompanies();
                console.log(data);
                setCompanies(data)
            }
            catch(err){
                console.error("Error getting companies", err);
            } finally {
                setLoading(false);
            }
        }
        getCommpanies();
    }, []);

    useEffect(() => {
        if(selectedCity){
            const filterCompanies = companies.filter(company => company.city.name === selectedCity)
            setFilteredCompanies(filterCompanies); 
        }
        else{
            setFilteredCompanies([]);
        }
    }, [selectedCity, companies])

    if (loading) return <p>Loading companies...</p>;

    const sortCompanies = (companies, sortKey) => {
        return companies.slice().sort((a, b) => {
          if (sortKey === 'rating') {
            return b[sortKey] - a[sortKey];
          }
          return a[sortKey].localeCompare(b[sortKey]);
        });
    };

    const filteredAndSortedCompanies = sortCompanies(filteredCompanies, sortKey);

    return (
        <div>
        <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <option value="name">Name</option>
          <option value="address">Location</option>
          <option value="rating">Rating</option>
        </select>
        {filteredAndSortedCompanies.map((company) => (
          <div key={company._id} onClick={() => onSelectCompany(company._id)}>
            <h2>{company.name}</h2>
            <p>Address: {company.address}</p>
            <p>Contact: {company.phone}</p>
            <p>Rating: {company.rating} / 5</p>
            <p>City: {company.city?.name}</p>
          </div>
        ))}
      </div>
    );
}

export default CompanyList;