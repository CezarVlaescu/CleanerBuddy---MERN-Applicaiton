import React from 'react';
import useCompanyDetails from '../hooks/useCompanyDetails';


function CompanyDetails({ companyId }) {
  const { companyDetails, isLoading, error } = useCompanyDetails(companyId);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!companyDetails) return <div>No company details available.</div>;

  return (
    <div>
      <h2>{companyDetails.name}</h2>
      <p>Address: {companyDetails.address}</p>
      <p>Contact: {companyDetails.phone}</p>
      <p>Rating: {companyDetails.rating} / 5</p>
      <p>City: {companyDetails.city?.name}</p>
    </div>
  );
}

export default CompanyDetails;
