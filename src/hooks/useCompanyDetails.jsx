import { useState, useEffect } from "react";
import { getCompanyById } from "../api/CompaniesApiHandler";

const useCompanyDetails = (companyId) => {
    const [companyDetails, setCompanyDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!companyId) return;

        const fetchedCompanyDetails = async () => {
            setIsLoading(true);
            try{
                const data = await getCompanyById(companyId);
                setCompanyDetails(data);
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setIsLoading(false);
            }
        }

        fetchedCompanyDetails();
    }, [companyId])

    return { companyDetails, isLoading, error };
}

export default useCompanyDetails;