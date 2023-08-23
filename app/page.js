/* 
the Home component is essential to the codebase because it initializes the application by fetching countries data from the REST Countries API and populating the global state. This data serves as the foundation for rendering information about countries in the application. The component demonstrates the use of context for managing state and abstracts the data fetching logic away from the UI components, promoting separation of concerns and modularity.
*/
"use client";
import { useEffect } from "react";
import HomeDesign from "./components/HomeDesign";
import { useContext } from "react";
import { StateContext } from "../app/StateProvider";

export default function Home() {
  const { setCountriesData } = useContext(StateContext);

  useEffect(() => {
    async function fetchCountriesData() {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountriesData(data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    }

    fetchCountriesData();
  }, []);

  return (
    <>
      <HomeDesign />
    </>
  );
}


