// import { createContext, useState, useEffect } from "react";
// import { getBaseUrl } from "../Utilities/getBaseUrl"; // ✅ import utility

// export const BrandsContext = createContext();

// export function BrandsProvider({ children }) {
//   const [brands, setBrands] = useState([]);
//   const [selectedBrand, setSelectedBrand] = useState(null);

//   useEffect(() => {
//     const baseUrl = getBaseUrl();
//     console.log(`BaseUrl ${baseUrl}`)

//     fetch(`${baseUrl}/brands`)
//       .then((res) => {
//         if (!res.ok) throw new Error(`Failed to fetch brands: ${res.status}`);
//         return res.json();
//       })
//       .then((data) => {
//         if (Array.isArray(data)) {
//           setBrands(data);
//         } else {
//           console.error("Unexpected brands format:", data);
//           setBrands([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Error fetching brands:", err);
//         setBrands([]);
//       });
//   }, []);

//   return (
//     <BrandsContext.Provider value={{ brands, selectedBrand, setSelectedBrand }}>
//       {children}
//     </BrandsContext.Provider>
//   );
// }


import { createContext, useState, useEffect } from "react";
import { getBaseUrl } from "../Utilities/getBaseUrl"; // Import utility for base URL

export const BrandsContext = createContext();

export function BrandsProvider({ children }) {
  const [brands, setBrands] = useState([]); // State to hold brands
  const [selectedBrand, setSelectedBrand] = useState(null); // State for selected brand

  // Fetch brands from API on component mount
  useEffect(() => {
    const baseUrl = getBaseUrl();  // Get the base URL (which includes IP from the query string or defaults)
    console.log(`Base URL used for fetching brands: ${baseUrl}`);

    // Fetch the brands data from the API
    fetch(`${baseUrl}/brands`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to fetch brands: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setBrands(data);  // Set brands if the response is an array
        } else {
          console.error("Unexpected response format:", data);
          setBrands([]);  // Reset brands if the response format is unexpected
        }
      })
      .catch((err) => {
        console.error("Error fetching brands:", err);
        setBrands([]);  // Reset brands in case of an error
      });
  }, []); // Empty dependency array to run only once when the component mounts

  return (
    <BrandsContext.Provider value={{ brands, selectedBrand, setSelectedBrand }}>
      {children} {/* Render child components */}
    </BrandsContext.Provider>
  );
}
