import React, { useState, useEffect } from 'react';
import { getCompanyById } from '../api/CompaniesApiHandler';

function CompanyDetails({ companyId }) {
  const [company, setCompany] = useState(null); 

  useEffect(() => {
    if (companyId) { 
      const fetchCompany = async () => {
        try {
          const data = await getCompanyById(companyId);
          setCompany(data);
        } catch (err) {
          console.error("Error getting the specific company", err);
        }
      };
      fetchCompany();
    }
  }, [companyId]); 

  if (!company) return <div>Loading...</div>; 

  return (
    <div>
      <h2>{company?.name}</h2>
      <p>Address: {company?.address}</p>
      <p>Contact: {company?.phone}</p>
      <p>Rating: {company?.rating} / 5</p>
      <p>City: {company?.city?.name}</p> 
    </div>
  );
}

export default CompanyDetails;
