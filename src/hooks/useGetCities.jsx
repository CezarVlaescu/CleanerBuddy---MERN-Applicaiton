import { useState, useEffect } from "react";
import { fetchCities } from "../api/CitiesApiHandler";

const useGetCities = () => {
    const [cities, setCities] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchedCities = async () => {
            setIsLoading(true);
            try{
                const data = await fetchCities();
                setCities(data);
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchedCities();
    }, [])   
    
    return { cities, isLoading, error } 
}

export default useGetCities;