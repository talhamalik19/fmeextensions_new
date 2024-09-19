import Navigation from './global/Header';
import Seo from './seo';
import Footer from './global/Footer';

const Layout = ({ children, globalMagento, user, setUser, pageData, currencyData, storeData, selectedCurrency, selectedStore, getPageData, isBlog=false, MobileDevice, sarabun }) => {
  return (
    <>
      <Seo seo={pageData} />
      <Navigation getPageData={getPageData} globalMagento={globalMagento} user={user} setUser={setUser} currencyData={currencyData} storeData={storeData} selectedCurrency={selectedCurrency} selectedStore={selectedStore} isBlog={isBlog} sarabun={sarabun} />
      {children}
      {!MobileDevice && <Footer globalMagento={globalMagento} storeData={storeData} selectedStore={selectedStore} setUser={setUser} />}
    </>
  );
};

export default Layout;
