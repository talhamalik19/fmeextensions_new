import React, { useEffect, useState } from 'react'

export default function UseMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
      const mediaQuery = window.matchMedia(query);
  
      const handleMediaChange = (e) => {
        setMatches(e.matches);
      };
  
      mediaQuery.addListener(handleMediaChange);
      setMatches(mediaQuery.matches);
  
      return () => {
        mediaQuery.removeListener(handleMediaChange);
      };
    }, [query]);
  
    return matches;
}
