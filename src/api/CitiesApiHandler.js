const baseUrl = "http://localhost:3000/api";

const fetchCities = async () => {
    try{
        const response = await fetch(`${baseUrl}/cities`, { method: "GET" });
        if(response.status !== 200) throw new Error("Error fetching cities")
        const data = await response.json();
        return data;
    }
    catch(err){
        console.error("Error fetching cities", err);    
    }
}

const getCityById = async (id) => {
    try{
        const response = await fetch(`${baseUrl}/cities/${id}`, { method: "GET" });
        if(response.status !== 200) throw new Error(`Error fetching city with ID ${id}`)
        return await response.json();
    }
    catch(err){
        console.error("Error getting the specific city", err);    
    }
}

const createCity = async (city) => {
    try{
        const response = await fetch(`${baseUrl}/cities`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(city)
        });
        if(!response.ok) throw new Error("Cannot create city");
        return await response.json();
    }
    catch(err){
        console.error("Error creating the0 city", err);   
    }
}

const updateCity = async (id, cityData) => {
    try{
        const response = await fetch(`${baseUrl}/cities/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json' },
            body: JSON.stringify(cityData)
        })
        if(!response.ok) throw new Error("Cannot update city");
        return await response.json();   
    }
    catch (err){
        console.error("Error update the city", err);   
    }
}

const deleteCity = async (id) => {
    try{
        const response = await fetch(`${baseUrl}/cities/${id}`, {
            method: 'DELETE'
        })
        if(!response.ok) throw new Error("Cannot delete city");
        return id;
    }
    catch (err){
        console.error("Error delete the city", err);   
    }
}

export {
    fetchCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity
}