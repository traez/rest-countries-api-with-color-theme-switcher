/* 
StateProvider, is a React context provider that plays a central role in managing and sharing the application's state across different components. This component uses the React Context API to create a context called StateContext, which can be accessed by other components within the application. The essence of this component is to provide a way to manage and share various states and functions throughout your application without having to pass them down manually through component props.
*/
"use client";
import { createContext, useState } from "react";

export const StateContext = createContext();

export default function StateProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [countriesData, setCountriesData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [renderingMode, setRenderingMode] = useState("all");
  const [filteredCountries, setFilteredCountries] = useState([]);

  function toggleDarkMode() {
    setIsDarkMode((prevMode) => !prevMode);
  }

  return (
    <StateContext.Provider
      value={{
        isDarkMode,
        toggleDarkMode,
        countryName,
        setCountryName,
        countriesData,
        setCountriesData,
        searchTerm,
        setSearchTerm,
        selectedRegion,
        setSelectedRegion,
        renderingMode,
        setRenderingMode,
        filteredCountries,
        setFilteredCountries,
      }}
    >
      {children}
    </StateContext.Provider>
  );
}
