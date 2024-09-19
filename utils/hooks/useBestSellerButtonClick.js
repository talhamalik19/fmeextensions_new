import { useEffect } from 'react';

const useBestSellerButtonClick = (callback) => {
  useEffect(() => {
    const handleClick = (event) => {
      // Check if the clicked element has the 'primary_cta' class
      if (event.target.classList.contains('prod_cta')) {
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

export default useBestSellerButtonClick;
