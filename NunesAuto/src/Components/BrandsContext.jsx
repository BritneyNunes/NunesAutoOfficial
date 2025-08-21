// BrandsContext.jsx
import { createContext, useState, useEffect } from "react";

export const BrandsContext = createContext();

export function BrandsProvider({ children }) {
  const [brands, setBrands] = useState([]);
  // ✅ FIX: The setter function's name is changed from `setSelectedBrands` to `setSelectedBrand`.
  const [selectedBrand, setSelectedBrand] = useState(null); // Using `null` is a good practice for an initial state with no selected brand.

  useEffect(() => {
    fetch("http://localhost:3000/brands")
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