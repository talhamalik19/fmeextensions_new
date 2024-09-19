import React, { useEffect, useRef, useState } from 'react'
import FaqContent from './FaqContent'
import FAQSideBar from './FAQSideBar';
import HeroInfo from '../HeroInfo';
import { getFaqTopics } from '@/pages/api/product';

export default function FAQ({ pageName, heading, title, text, description, button, button2, sideBarDesc, sarabun }) {

    // // Hero Section of services
    const heroFaq = {
        title: 'MAGENTO 2 SPEED OPTIMIZATION',
        desc: '100% Refund If Your Website Takes > 2 Seconds To Load. 47% of customers expect your website to load within 2 or less than 2 seconds',
        ctaCnt: 'Request For Quote',
        section_bg: true,
    }

    const cmsCntRef = useRef(null);
    const cmsSidebarRef = useRef(null);

    const fetchfaqData = async () => {
        const fetchFaqData = await getFaqTopics();
        try {
            setFaqData((prevFaq) => {
                const newFaq = [...prevFaq, ...fetchFaqData.data.faqs_topics];

                return newFaq;
            });
        } catch (e) { }
    };

    useEffect(() => {
        const handleHeight = () => {
            if (cmsCntRef.current && cmsSidebarRef.current) {
                const cmsHeight = cmsCntRef.current.offsetHeight;
                cmsSidebarRef.current.style.height = `${cmsHeight}px`;
            }
        };
        const handleScreenSize = () => {
            if (window.innerWidth > 767) { // Check if the window width is greater than 767 pixels
                handleHeight();
            }
        };
        // Run the code on initial render
        handleScreenSize();
        // Attach event listener to resize event for responsive behavior
        window.addEventListener('resize', handleScreenSize);
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleScreenSize);
        };
    }, [])

    // For FAQ Page Tab Effect when click on sidebar item show relevent block
    const [selectedItem, setSelectedItem] = useState(0);
    const handleItemClick = (id) => {
        setSelectedItem(id);
    };
    // All FAQs Api Integration
    const [faqData, setFaqData] = useState([]);
    useEffect(() => {
        setFaqData([])
        fetchfaqData();
    }, [pageName]);

    const blockContent = {
        heading: heading,
        text: text,
        button2: button2,
        section_bg: 'true',
    }
    
    return (
        <>
            <div className="section_padding">
                <div className="main_container">
                    <div className="cms_pg">
                        <div className="cms_inner">
                            <div className="side_bar" ref={cmsSidebarRef}>
                                <FAQSideBar faqSidebar={faqData} pageName={pageName} faqSideDesc={sideBarDesc} selectedItem={selectedItem} handleItemClick={handleItemClick} title={title} description={description} button={button} sarabun={sarabun}/>
                            </div>
                            <div className='cms_cnt_block' ref={cmsCntRef}>
                                <FaqContent faqContent={faqData} selectedItem={selectedItem} sarabun={sarabun}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <HeroInfo blockContent={blockContent} sarabun={sarabun}/>
        </>
    )
}
