/* 
 the HomeDesign component is the core UI component responsible for rendering the home page of the application. It incorporates features like theme switching, search functionality, region filtering, and the display of country information. Its dynamic rendering based on user input and selected theme, along with its connection to the shared state managed by the StateProvider, makes it an essential part of the entire codebase.
*/
"use client";
import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { StateContext } from "../StateProvider";

export default function HomeDesign() {
  const router = useRouter();
  const {
    isDarkMode,
    toggleDarkMode,
    setCountryName,
    countriesData,
    searchTerm,
    setSearchTerm,
    selectedRegion,
    setSelectedRegion,
    renderingMode,
    setRenderingMode,
    filteredCountries,
    setFilteredCountries,
  } = useContext(StateContext);

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
          : countriesData.filter(
              (country) => country.region.toLowerCase() === selectedRegion
            );
    }

    setFilteredCountries(updatedCountriesData);
  }, [countriesData, renderingMode, searchTerm, selectedRegion]);

  useEffect(() => {
    if (searchTerm === "") {
      setRenderingMode("all");
    }
  }, [searchTerm]);

  const regionOptions = [
    "all",
    "africa",
    "americas",
    "antarctic",
    "asia",
    "europe",
    "oceania",
  ];

  return (
    <div className={`root-${isDarkMode ? "dark" : "lite"}`}>
      <main className="mhl-main">
        <aside className={`mh${isDarkMode ? "d" : "l"}-aside`}>
          <header className="mhl-head">
            <a
              href="https://github.com/traez/rest-countries-api-with-color-theme-switcher"
              target="_blank"
              className={`mh${isDarkMode ? "d" : "l"}-a`}
            >
              REST Countries API with color theme switcher
            </a>
            <b className="mhl-b">©2023 Trae Zeeofor</b>
          </header>
          <menu className="mhl-menu">
            <h1 className="mhl-h1">Where in the world?</h1>
            <div
              className={`mh${isDarkMode ? "d" : "l"}-mode`}
              onClick={toggleDarkMode}
            >
              <div className="mhl-moonsun">
                <img
                  src={`/images/${isDarkMode ? "sun" : "moon"}.png`}
                  alt=""
                  className="mhl-moonsunimg"
                />
              </div>
              <h2 className="mhl-h2">{isDarkMode ? "Lite" : "Dark"} Mode</h2>
            </div>
          </menu>
        </aside>

        <article className="mhl-article">
          <div className={`mh${isDarkMode ? "d" : "l"}-maginp`}>
            <div className="mhl-magcontain">
              <img src="/images/magnify.png" alt="" className="mhl-magnify" />
            </div>
            <input
              type="search"
              placeholder="Search for a country..."
              className={`mh${isDarkMode ? "d" : "l"}-inp`}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setRenderingMode("input");
              }}
            />
          </div>
          <select
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              setRenderingMode("select");
            }}
            className={`mh${isDarkMode ? "d" : "l"}-sel`}
          >
            {regionOptions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </article>

        <section className="mhl-sec">
          {(renderingMode === "all" ? countriesData : filteredCountries).map(
            (country, index) => (
              <nav
                key={index}
                className={`mh${isDarkMode ? "d" : "l"}-nav`}
                onClick={() => {
                  router.push(
                    `/${country.name.common.replace(/\s+/g, "").toLowerCase()}`
                  );
                  setCountryName(country.name.common);
                }}
              >
                <div className="mhl-flagcontainer">
                  <Image
                    src={country.flags.svg}
                    alt=""
                    fill
                    sizes="(min-width: 400px) 100vw"
                  />
                </div>
                <div className="mhl-flagdata">
                  <h3 className="mhl-h3">{country.name.common}</h3>
                  <ul className="mhl-ul">
                    <li className="mhl-li">
                      <strong className="mhl-strong">Population</strong>
                      <small className={`mh${isDarkMode ? "d" : "l"}-small`}>
                        {country.population}
                      </small>
                    </li>
                    <li className="mhl-li">
                      <strong className="mhl-strong">Region</strong>
                      <small className={`mh${isDarkMode ? "d" : "l"}-small`}>
                        {country.region}
                      </small>
                    </li>
                    <li className="mhl-li">
                      <strong className="mhl-strong">Capital</strong>
                      <small className={`mh${isDarkMode ? "d" : "l"}-small`}>
                        {country.capital}
                      </small>
                    </li>
                  </ul>
                </div>
              </nav>
            )
          )}
        </section>
      </main>
    </div>
  );
}


