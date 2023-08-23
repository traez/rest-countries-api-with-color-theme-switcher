import React, { useState, useEffect } from "react";

const CountryList = () => {
  const [countriesData, setCountriesData] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [renderingMode, setRenderingMode] = useState("all");

  useEffect(() => {
    // Fetch countries data using Fetch API
    fetch("/api/countries") // You'll need to create an API route for this
      .then((response) => response.json())
      .then((data) => setCountriesData(data));
  }, []);

  useEffect(() => {
    // Apply filters based on search term and selected region
    let updatedCountriesData = countriesData;

    if (renderingMode === "input") {
      updatedCountriesData = countriesData.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (renderingMode === "select") {
      updatedCountriesData =
        selectedRegion === "all"
          ? countriesData
          : countriesData.filter((country) => country.region.toLowerCase() === selectedRegion);
    }

    setFilteredCountries(updatedCountriesData);
  }, [countriesData, renderingMode, searchTerm, selectedRegion]);

  useEffect(() => {
    if (searchTerm === "") {
      setRenderingMode("all");
    }
  }, [searchTerm]);

  const regionOptions = ["all", "africa", "america", "asia", "europe", "oceania"];

  return (
    <div>
      <input
        type="search"
        placeholder="Search by country name"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setRenderingMode("input");
        }}
      />

      <select
        value={selectedRegion}
        onChange={(e) => {
          setSelectedRegion(e.target.value);
          setRenderingMode("select");
        }}
      >
        {regionOptions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>

      {(renderingMode === "all" ? countriesData : filteredCountries).map((country) => (
        <div key={country.id}>
          <img src={country.flag} alt="Flag" />
          <p>{country.name}</p>
          <p>{country.region}</p>
        </div>
      ))}
    </div>
  );
};

export default CountryList;
