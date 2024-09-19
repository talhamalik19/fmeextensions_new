
import Accordion from '@/components/global/Accordion'
import SectionCta from '@/components/global/SectionCta'
import { getFaqTopics } from '@/pages/api/product';
import dlv from 'dlv';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';

export default function SupportFaq({ heading, button, sarabun }) {
    const fetchfaqData = async () => {
        const fetchFaqData = await getFaqTopics();
        try {
            setFaqData((prevFaq) => {
                const newFaq = [...prevFaq, ...fetchFaqData.data.faqs_topics];

                return newFaq;
            });
        } catch (e) { }
    };
    // All FAQs Api Integration
    const [faqData, setFaqData] = useState([]);
    useEffect(() => {
        fetchfaqData();
    }, []);

    // Filter the data based on the identifier
    const filterData = faqData.find(item => item.identifier === "general")
    
    return (
        <div className="section_bg">
            <div className="section_padding">
                <div className="main_container">
                    <div className="support_faq">
                        <div className="spt_faq_block">
                            {heading && <h2 className={`${sarabun} primary_title`}>{heading}</h2>}
                            {button && <SectionCta props={dlv(button,'field_text')} url={dlv(button,'field_redirect')} ctaClass="secondary_cta" />}
                        </div>
                        <div className="spt_faq_acc">
                            <Accordion acc={filterData} sarabun={sarabun}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
