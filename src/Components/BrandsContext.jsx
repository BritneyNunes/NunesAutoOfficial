import { createContext, useState, useEffect } from "react";
import { getBaseUrl } from "../Utilities/getBaseUrl"; // Import utility for base URL

export const BrandsContext = createContext();


export function BrandsProvider({ children }) {
  const [brands, setBrands] = useState([]); // State to hold brands
  const [selectedBrand, setSelectedBrand] = useState(null); // State for selected brand
  
  // Fetch brands from API on component mount
  useEffect(() => {
    
    // 1. Define the asynchronous function
    const fetchBrands = async () => {
        const baseUrl = getBaseUrl();
        const url = `${baseUrl}/brands`;

        // CRITICAL DEBUG: This synchronous log is the first thing that runs.
        // If you still don't see this, the BrandsProvider component is not rendering.
        console.log(`BrandsProvider useEffect running. Attempting to fetch from: ${url}`); 
        
        try {
            const res = await fetch(url);

            // Step 1: Check for non-200 status codes (404, 500, etc.)
            if (!res.ok) {
                // Read the response text for detailed error message
                const text = await res.text();
                throw new Error(`HTTP Error ${res.status} from brands API. Server response preview: ${text.substring(0, 100)}...`);
            }
            
            // Step 2: Proceed to parse JSON.
            const data = await res.json();

            // Step 3: Check if the parsed data is an array as expected.
            if (Array.isArray(data)) {
                console.log('Successfully fetched brands. Total:', data.length);
                setBrands(data);
            } else {
                console.error("Unexpected response format: Brands API returned non-array data.", data);
                setBrands([]);
            }

        } catch (err) {
            // Step 4: Catch network errors, CORS issues, or the custom error thrown in Step 1.
            console.error("ERROR FETCHING BRANDS. Check URL and backend status:", err.message);
            setBrands([]); 
        }
    };

    // 2. Immediately invoke the asynchronous function
    fetchBrands();
    
    // NOTE: If you had a cleanup function (e.g., to cancel the request), you would return it here.
    
  }, []); // The empty dependency array is correct for running once on mount

  return (
    <BrandsContext.Provider value={{ brands, selectedBrand, setSelectedBrand }}>
      {children} {/* Render child components */}
    </BrandsContext.Provider>
  );
}