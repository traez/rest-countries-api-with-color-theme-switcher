/* 
The DetailMobile component is a part of the codebase that contributes to displaying detailed information about a specific country, specifically tailored for mobile devices. It leverages the data provided by the StateContext from the StateProvider to fetch and present the relevant country details.
*/
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { StateContext } from "../StateProvider";

export default function DetailMobile() {
  const router = useRouter();
  const {
    isDarkMode,
    toggleDarkMode,
    countryName,
    countriesData,
    setCountryName,
  } = useContext(StateContext);

  const currentCountry = countriesData.find(
    (country) => country.name.common === countryName
  );

  return (
    <div className={`root-${isDarkMode ? "dark" : "lite"}`}>
      <main className="mdl-main">
        <aside className={`md${isDarkMode ? "d" : "l"}-aside`}>
          <header className="mhl-head">
            <a
              href="https://github.com/traez/rest-countries-api-with-color-theme-switcher"
              target="_blank"
              className={`md${isDarkMode ? "d" : "l"}-a`}
            >
              REST Countries API with color theme switcher
            </a>
            <b className="mhl-b">©2023 Trae Zeeofor</b>
          </header>
          <menu className="mhl-menu">
            <h1 className="mhl-h1">Where in the world?</h1>
            <div
              className={`md${isDarkMode ? "d" : "l"}-mode`}
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

        <section className="mdl-sec">
          <div
            className={`md${isDarkMode ? "d" : "l"}-arrowback`}
            onClick={() => {
              router.push(`/`);
            }}
          >
            <div className="mdl-arrow">
              <img
                src={`/images/arrow-${isDarkMode ? "lite" : "dark"}.png`}
                alt=""
                className="mdl-arrowimg"
              />
            </div>
            <div className="mdl-back">Back</div>
          </div>
          <div className="mdl-flagcontainer">
            <Image
              src={currentCountry.flags.svg}
              alt=""
              fill
              sizes="(min-width: 400px) 100vw"
            />
          </div>
          <div className="mdl-infobloc1">
            <div className="mdl-country">{countryName}</div>
            <ul className="mdl-ul">
              <li className="mdl-li">
                <span className="mdl-span1">Native Name</span>
                <span className="mdl-span2">
                  {
                    currentCountry.name.nativeName[
                      Object.keys(currentCountry.name.nativeName)[0]
                    ].common
                  }
                </span>
              </li>
              <li className="mdl-li">
                <span className="mdl-span1">Population</span>
                <span className="mdl-span2">
                  {currentCountry.population.toLocaleString()}
                </span>
              </li>
              <li className="mdl-li">
                <span className="mdl-span1">Region</span>
                <span className="mdl-span2">{currentCountry.region}</span>
              </li>
              <li className="mdl-li">
                <span className="mdl-span1">Sub Region</span>
                <span className="mdl-span2">{currentCountry.subregion}</span>
              </li>
              <li className="mdl-li">
                <span className="mdl-span1">Capital</span>
                <span className="mdl-span2">{currentCountry.capital[0]}</span>
              </li>
            </ul>
          </div>
          <div className="mdl-infobloc2">
            <li className="mdl-li">
              <span className="mdl-span1">Top Level Domain</span>
              <span className="mdl-span2">{currentCountry.tld[0]}</span>
            </li>
            <li className="mdl-li">
              <span className="mdl-span1">Currencies</span>
              <span className="mdl-span2">
                {
                  currentCountry.currencies[
                    Object.keys(currentCountry.currencies)[0]
                  ].name
                }
              </span>
            </li>
            <li className="mdl-li">
              <span className="mdl-span1">Languages</span>
              <span className="mdl-span2">
                {
                  currentCountry.languages[
                    Object.keys(currentCountry.languages)[0]
                  ]
                }
              </span>
            </li>
          </div>
          <div className="mdl-border">
            <div className="mdl-borderco">Border Countries:</div>
            {currentCountry.borders && currentCountry.borders.length > 0 && (
              <>
                <div className="mdl-bordergroup">
                  {currentCountry.borders.map((borderCca3) => {
                    const borderCountry = countriesData.find(
                      (country) => country.cca3 === borderCca3
                    );

                    if (!borderCountry) return null;

                    return (
                      <div
                        key={borderCca3}
                        className={`md${isDarkMode ? "d" : "l"}-bordercountry`}
                        onClick={() => {
                          router.push(
                            `/${borderCountry.name.common
                              .replace(/\s+/g, "")
                              .toLowerCase()}`
                          );
                          setCountryName(borderCountry.name.common);
                        }}
                      >
                        {borderCountry.name.common}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
