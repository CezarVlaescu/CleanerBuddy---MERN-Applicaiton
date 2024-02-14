const sortCompanies = (companies, sortKey) => {
    return companies.slice().sort((a, b) => {
      if (sortKey === "rating") {
        return b[sortKey] - a[sortKey];
      }
      return a[sortKey].localeCompare(b[sortKey]);
    });
  };
  
  export { sortCompanies };
  