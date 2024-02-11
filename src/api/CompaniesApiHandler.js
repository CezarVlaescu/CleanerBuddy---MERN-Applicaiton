const baseUrl = "http://localhost:3000/api";

const getCompanies = async () => {
    try{
        const response = await fetch(`${baseUrl}/companies`);
        if(!response.ok) throw new Error('Cannot fetch companies from API');
        return await response.json();
    }
    catch(err){
        console.error('Failed to fetch companies from API', err);
    }
}

const getCompanyById = async (id) => {
    try{
        const response = await fetch(`${baseUrl}/companies/${id}`, { method: "GET" });
        if(response.status !== 200) throw new Error(`Error fetching company with ID ${id}`)
        return await response.json();
    }
    catch(err){
        console.error("Error getting the specific company", err);    
    }
}

const createCompany = async (company) => {
    try{
        const response = await fetch(`${baseUrl}/companies`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(company)
        });
        if(!response.ok) throw new Error("Cannot create company");
        return await response.json();
    }
    catch(err){
        console.error("Error creating the company", err);   
    }
}

const updateCompany = async (id, companyData) => {
    try{
        const response = await fetch(`${baseUrl}/companies/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(companyData)
        })
        if(!response.ok) throw new Error("Cannot update company");
        return await response.json();   
    }
    catch (err){
        console.error("Error update the company", err);   
    }
}

const deleteCompany = async (id) => {
    try{
        const response = await fetch(`${baseUrl}/companies/${id}`, {
            method: 'DELETE'
        })
        if(!response.ok) throw new Error("Cannot delete company");
        return id;
    }
    catch (err){
        console.error("Error delete the company", err);   
    }
}

export {
    getCompanies,
    getCompanyById,
    createCompany,
    updateCompany,
    deleteCompany
}