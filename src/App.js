import React, { useEffect, useState } from 'react';
import './styles/App.css';
import SearchBox from './components/SearchBox';
import CompanyDetails from './components/CompanyDetails';
import CompanyList from './components/CompanyList';
import Map from './components/Map';
import { getCompanyById } from './api/CompaniesApiHandler';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [inputValue, setInputValue] = useState(''); 
  const [companyAddress, setCompanyAddress] = useState('');

  const resetSelection = () => setSelectedCompanyId(null);
  
  useEffect(() => {
    let isMounted = true;
    const getCompany = async () => {
      if (selectedCompanyId !== null) {
        try {
          const data = await getCompanyById(selectedCompanyId);
          if (data && data.address && isMounted) {
            setCompanyAddress(data.address);
          }
        } catch (err) {
          console.error("Error fetching company details", err);
        }
      }
    }
  
    getCompany();
  
    return () => isMounted = false; 
  }, [selectedCompanyId]);

  return (
    <div className='app-container'>
      <div className='search-container'>
        <SearchBox inputValue={inputValue} setInputValue={setInputValue} setSelectedCity={setSelectedCity} />
      </div>
      <div className='company-container'>
        {selectedCompanyId ? (
          <div className='company-details-container'>
            <button className='back-button' onClick={resetSelection}>Back to Companies</button>
            <CompanyDetails companyId={selectedCompanyId} />
          </div>
        ) : (
          <div className='company-list'>
            <CompanyList selectedCity={selectedCity} onSelectCompany={setSelectedCompanyId} />
          </div>
        )}
        <div className='map-view'>
          <Map companyAdd={companyAddress} />
        </div>
      </div>
    </div>
  );
  
}

export default App;
