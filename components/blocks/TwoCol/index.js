
import React from 'react'
import ContentBlock from './ContentBlock'
import TwoColImage from './TwoColImage'
import dlv from 'dlv'

export default function TwoCol({ aboutTwoCol, pageName, sarabun }) {
    const partnerCatalog = {
        sectionBg: true,
        rightImage: false,
        title: 'Being a Part of Magento',
        desc: 'Being a part of the Magento Industry with almost a decade of impeccable excellence, we have facilitated firms, organizations and businesses of every scale in becoming the top sellers in Magento products and services. For the trust and mutual benefit we have between, we proudly feature all our partners on this page to show important they mean to us. We also welcome new businesses to join us and become partners of the most profitable organization in the Ecommerce Industry.',
        image: '/images/partner-magento.png',
    }
    const aboutUs = {
        sectionBg: false,
        rightImage: false,
        title: '',
        desc: 'We, at FME Extensions, believe in providing our clients the best of services in the most professional manner with the help of our team of Magento Experts. We understand that the requirements of your store is different from other Magento store designs. Thus, we integrate our services in a manner that your requirements are completed with utmost diligence and efficiency. Whether you want to use our Magento Consultancy service or Magento Custom development, we offer you a Dedicated Magento developer team.Their devoted services for Magento extension installation and Magento theme installation help you get the best out of your store environment. Apart from Magento installation, we have added services which signify that we care for our clients. With our Magento Data migration, you can quit worrying about your data transfer from one platform to another.Get in touch with our experts for any Magento related service that you require, whether it be Magento payment gateway integration, Magento Products entry or maintenance. We offer innovative solutions that you can admire while you indulge yourself in your very own store. Our hard to resist Magento designs will cast a charm on you and might just make you buy from your own store.',
        image: '/images/partner-magento.png',
        number:{
            title:'FME in Numbers',
            numberCount:[
                {id:1, count:'100+', title:'FME Magento Extensions Live Working'},
                {id:2, count:'100k', title:'Customers in'},
                {id:3, count:'100+', title:'Projects'},
                {id:4, count:'13+', title:'Years of experience'},

            ]
        }
    }
    return (
        <>
            { pageName === 'Partner Catalog' ?
                <div className={partnerCatalog.sectionBg === true ? 'section_bg' : ''}>
                    <div className="section_padding">
                        <div className="main_container">
                            <div className={partnerCatalog.rightImage === true ? "smp_two_col right_image" : "smp_two_col"}>
                                <ContentBlock pageName={pageName} colContent={partnerCatalog} sarabun={sarabun}/>
                                <TwoColImage colImage={partnerCatalog} />
                            </div>
                        </div>
                    </div>
                </div> : ''
            }
            { pageName === 'About Us' ?
                aboutTwoCol && <div className={dlv(aboutTwoCol,'section_bg') == 'true' ? 'section_bg' : ''}>
                    <div className="section_padding">
                        <div className="main_container aboutimg">
                            <div className={dlv(aboutTwoCol,'right_image') == 'true' ? "smp_two_col right_image" : "smp_two_col"}>
                                <ContentBlock pageName={pageName} colContent={aboutTwoCol} sarabun={sarabun}/>
                                <TwoColImage colImage={aboutTwoCol} />
                            </div>
                        </div>
                    </div>
                </div> : ''
            }

        </>
    )
}
