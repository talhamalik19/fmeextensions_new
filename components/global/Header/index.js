import dlv from "dlv";
import HeaderIcon from "./HeaderIcon";
import Logo from "./Logo";
import Nav from "./Nav";
import Search from "./Search";
import { useState, useEffect } from 'react';


const Navigation = ({ globalMagento, user, setUser, currencyData, selectedCurrency, selectedStore, getPageData, isBlog, storeData, sarabun }) => {
    const [customBlocksData, setCustomBlocksData] = useState([]);
    const fetchPageData = async () => {
        const pageData = await getPageData();
        try {
            setCustomBlocksData(JSON.parse(pageData.data.blocks_data));
        } catch (e) { }
    }

    useEffect(() => {
        fetchPageData();
    }, [globalMagento]);
    const [isScrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset;
            const isTop = scrollTop <= 10;
            setScrolled(!isTop);
        };
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const [sideBar, setSideBar] = useState(false);
    return (
        <>
            <header className={`${isScrolled ? "scrolled" : ''}`}>
                <div className="header_container">
                    <div className="header">
                        <div className="top_row">
                            <Logo />
                            <Search selectedStore={selectedStore} isBlog={false} />
                            <HeaderIcon user={user} setUser={setUser} currencyData={currencyData} selectedCurrency={selectedCurrency} selectedStore={selectedStore} sideBar={sideBar} setSideBar={setSideBar} customBlocksData={dlv(customBlocksData,'2')} storeData={storeData} sarabun={sarabun}/>
                        </div>
                        <div className="nav_block">
                            <div className="resp_logo">
                                <Logo />
                            </div>
                            <div className="resp_rows">
                                <Nav globalMagento={globalMagento} selectedStore={selectedStore} sideBar={sideBar} setSideBar={setSideBar} customBlocksData={customBlocksData}/>
                                <HeaderIcon hideItem={true} user={user} setUser={setUser} currencyData={currencyData} selectedCurrency={selectedCurrency} selectedStore={selectedStore} sideBar={sideBar} setSideBar={setSideBar} customBlocksData={dlv(customBlocksData,'2')} storeData={storeData} sarabun={sarabun} />
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
Navigation.defaultProps = {};
export default Navigation;