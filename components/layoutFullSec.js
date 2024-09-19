import Footer from './global/Footer';
import Navigation from './global/Header';
// import Script from "next/script";

const LayoutFullSec = ({ children }) => {
  return (
    <>
      <section className='full_width_pg'>
        {children}
      </section>
    </>
  );
};

export default LayoutFullSec;
