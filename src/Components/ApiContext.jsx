// src/context/ApiContext.jsx
import { createContext, useContext } from "react";

// Create the context
const ApiContext = createContext();

// Function to get API URL from query or fallback
const getApiUrl = () => {
  const fullUrl = new URL(window.location);
  let ip = fullUrl.searchParams.get("ip");

  if (!ip) {
    // fallback if no IP in query string
    ip = "44.209.222.79";
    fullUrl.searchParams.set("ip", ip);
    window.history.pushState({}, "", fullUrl); // updates browser URL without reload
  }

  return `http://${ip}:3000`; // your backend port
};

// Provider component
export const ApiProvider = ({ children }) => {
  const apiUrl = getApiUrl();

  return (
    <ApiContext.Provider value={{ apiUrl }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => useContext(ApiContext);
