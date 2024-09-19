import dlv from "dlv";
import CopyRight from "./CopyRight";
import FooterContent from "./FooterContent";
import FooterLinks from "./FooterLinks";
import Newsletter from "./Newsletter";
import ScrollTop from "./ScrollTop";

const Footer = ({ globalMagento, storeData, selectedStore, setUser }) => {
    return(
        <footer id="footer">
            <Newsletter footerData={dlv(globalMagento,'footerData.footerNewsLetter')} setUser={setUser} />
            <FooterContent footerData={dlv(globalMagento,'footerData.footer')} />
            <FooterLinks categories={dlv(globalMagento,'children')} footerData={dlv(globalMagento,'footerData.footer')} />
            <CopyRight footerData={dlv(globalMagento,'footerData.footerBootom')} storeData={storeData} selectedStore={selectedStore} />
            <ScrollTop/>
        </footer>
    )
}

export default Footer;