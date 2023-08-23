import { useState, useEffect } from "react";

export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);

    // Initial check for media query matches
    setMatches(mediaQuery.matches);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
};

/* 
This code defines a custom React hook called useMediaQuery. It takes a media query string as an argument and returns a boolean value indicating whether the media query matches the current state of the browser.

The significance of this code is that it allows React components to respond to changes in the browser's environment, such as the screen size or orientation. For example, you could use this hook to conditionally render different layouts for different screen sizes.

Here is how the code works:

The useState hook creates a state variable called matches and initializes it to false.
The useEffect hook is used to listen for changes to the media query. When the media query changes, the handleChange function is called. This function updates the matches state variable to reflect the new value of the media query.
The return statement returns the value of the matches state variable.
*/