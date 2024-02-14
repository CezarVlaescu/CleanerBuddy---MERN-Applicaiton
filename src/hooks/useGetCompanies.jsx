import { useState, useEffect } from "react";
import { getCompanies } from "../api/CompaniesApiHandler";

const useGetCompanies = () => {
    const [companies, setCompanies] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchedCompanies = async () => {
            setIsLoading(true)
            try{
                const data = await getCompanies();
                setCompanies(data);
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchedCompanies();
    }, [])
    
    return {companies, isLoading, error }
}

export default useGetCompanies;