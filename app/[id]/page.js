/* 
The CountryDetail component serves as the entry point for displaying detailed information about a specific country. It dynamically selects between two different detail components (DetailMobile and DetailDesktop) based on the device's screen width. This component contributes to the overall codebase by facilitating the rendering of country-specific details in a responsive manner. 
*/
"use client";
import useMediaQuery from "../libraries/useMediaQuery";
import DetailMobile from "../[id]/DetailMobile";
import DetailDesktop from "../[id]/DetailDesktop";

export default function CountryDetail() {
  const isMobile = useMediaQuery("(max-width: 799px)");
  const Detail = isMobile ? DetailMobile : DetailDesktop;

  return (
    <>
      <Detail />
    </>
  );
}


