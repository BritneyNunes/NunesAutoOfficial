import { createContext, useState, useEffect } from "react";
import { useApi } from "./ApiContext";

export const BrandsContext = createContext();

export function BrandsProvider({ children }) {
  const { apiUrl } = useApi(); //Get apiURL from context 
  const [brands, setBrands] = useState([]);
  
  const [selectedBrand, setSelectedBrand] = useState(null); // Using `null` is a good practice for an initial state with no selected brand.

  useEffect(() => {
    fetch(`${apiUrl}/brands`)
      .then((res) => res.json())
      .then((data) => setBrands(data))
      .catch((err) => console.error("Error fetching brands:", err));
  }, []);

  return (
    <BrandsContext.Provider value={{ brands, setBrands, selectedBrand, setSelectedBrand }}>
      {children}
    </BrandsContext.Provider>
  );
}