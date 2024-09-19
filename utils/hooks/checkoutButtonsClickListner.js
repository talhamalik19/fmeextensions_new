// hooks/useGlobalClickListener.js
import { useEffect } from 'react';

const checkoutButtonsClickListner = (callback, className) => {
  useEffect(() => {
    const handleClick = (event) => {
      // Check if the clicked element has the 'primary_cta' class
      if (event.target.classList.contains(className)) {
        const isNewTab = event.metaKey || event.ctrlKey;
        callback(event, isNewTab);
      }
    };

    // Add the global click event listener
    document.addEventListener('click', handleClick);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback]);
};

export default checkoutButtonsClickListner;
