import React, { useState } from 'react';
import './styles/App.css';
import SearchBox from './components/SearchBox';
import CompanyDetails from './components/CompanyDetails';
import CompanyList from './components/CompanyList';

function App() {
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [inputValue, setInputValue] = useState(''); 
  const resetSelection = () => setSelectedCompanyId(null);

  return (
    <>
      <SearchBox inputValue={inputValue} setInputValue={setInputValue} setSelectedCity={setSelectedCity} />
      {selectedCompanyId ? (
        <>
          <button onClick={resetSelection}>Back to Companies</button>
          <CompanyDetails companyId={selectedCompanyId} />
        </>
      ) : (
        <CompanyList selectedCity={selectedCity} onSelectCompany={setSelectedCompanyId} />
      )}
    </>
  );
}

export default App;
