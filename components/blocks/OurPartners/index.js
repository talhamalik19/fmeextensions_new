import React from 'react'
import PartnerBanner from './PartnerBanner'
import PartnerTwoCol from './PartnerTwoCol';
import PartnerIconBox from './PartnerIconBox';
import PartnerPackage from './PartnerPackage';

export default function OurPartners({ heroInfo, pageName }) {
    // Partner Banner Object
    const partnerBanner = {
        highlightedText: 'FME Partner Program',
        title: 'Maxomize Your Benefits Magento Development Agency',
    }
    // Partner Info Object
    const partnerIntro = {
        title: 'Our Partner Program',
        desc: [
            { id: 1, text: 'Through our extensive network and over a decade of experience as one of the leading Magento development website, FME has managed to become globally recognized for its trust and quality products and services. With over 10000+ clients using our top quality Magento extensions and services, FME offers partnership program to web developers, web designer and ecommerce organizations from around the globe.', },
            { id: 2, text: 'We offer free registration on flexible programs with Ready, Silver and Gold memberships so you can earn revenues for your stores while save money through our discounts. You can select Ready but for Gold you need to qualify for silver first by meeting revenue commitment. As you become our retailing partner we will feature you proudly on our partner page so you may use more exposure to acquire sales. In response the partner should also place FmeExtensions Partnership badge on his website.', }
        ],
        image: 'images/our_partner.png',
        imageLeft: true,
    };
    // Partner Icon Widget Object
    const partnerIconWidget = {
        title: 'Why Our Program is Worth Trying?',
        card: [
            { id: 1, desc: 'Technical solutions that catalyze your ecommerce growth and increase profitability.', icon: 'images/partner_program_1.png' },
            { id: 2, desc: 'Deploying custom extensions on urgent basis with the lowest reasonable', icon: 'images/partner_program_2.png' },
            { id: 3, desc: 'End-to-end extensions implementation, integration, theme customization, design and content.', icon: 'images/partner_program_3.png' },
            { id: 4, desc: 'SEO/SEM, Email Marketing, Optimization, Migration, Analytics and many other services.', icon: 'images/partner_program_4.png' },
            { id: 5, desc: '10000+ Magento clients receiving FME extensions and services worldwide.', icon: 'images/partner_program_5.png' },
            { id: 6, desc: 'Follows transparent ranking system Ready - Silver - Gold Fme extensions module', icon: 'images/partner_program_6.png' },
            { id: 7, desc: 'Magento Support and Consultancy services integrated with partnership programs.', icon: 'images/partner_program_7.png' },
            { id: 8, desc: 'Appearance on partners listing page and over 50% discount on FME products.', icon: 'images/partner_program_8.png' },
        ],
        ctaText: 'Need to help in Magento 2 Development?',
    }
    // Partner Package Object
    const packages = {
        title:'We Offer You 3 Levels of PartnerShip',
        packageInfo : [
            {
                id: 1, icon: 'images/pckg_icon_1.png', name: 'Ready', percentage: 25, pckgSlogan: 'No revenue Commitment',
                benefits: [
                    { id: 1, text: 'Free Partner Registration' },
                    { id: 2, text: 'Prioritized Support' },
                    { id: 3, text: 'Partners Newsletter' },
                    { id: 4, text: 'Listing in Partners Catalog' },
                    { id: 5, text: 'Fme Extensions Partner Logo Rights' },
                ],
                class:true,
            },
            {
                id: 2, icon: 'images/pckg_icon_2.png', name: 'Sliver', percentage: 35, pckgSlogan: '3000$ in a Year revenue Commitment',
                benefits: [
                    { id: 1, text: 'Free Partner Registration' },
                    { id: 2, text: 'Prioritized Support' },
                    { id: 3, text: 'Partners Newsletter' },
                    { id: 4, text: 'Listing in Partners Catalog' },
                    { id: 5, text: 'Fme Extensions Partner Logo Rights' },
                ],
            },
            {
                id: 3, icon: 'images/pckg_icon_3.png', name: 'Gold', percentage: 50, pckgSlogan: '5000$ in a Year revenue Commitment',
                benefits: [
                    { id: 1, text: 'Free Partner Registration' },
                    { id: 2, text: 'Prioritized Support' },
                    { id: 3, text: 'Partners Newsletter' },
                    { id: 4, text: 'Listing in Partners Catalog' },
                    { id: 5, text: 'Fme Extensions Partner Logo Rights' },
                ],
            },
        ],
        ctaCnt:'Become a Partner',
        sectionBg: true,
    }
    // Partner Hero Section Object
    const partnerHero = {
        title:'How to become a partner',
        desc:'You are just a click away from becoming FME’s valued partner officially. All you need to do is fill in all the details in the registration form and transfer the setup payment. We will have our representatives contact you and guide you through the procedure. You can ask any questions if you have reservations.',
        ctaCnt:'Become a Partner',
        section_bg : false,
    }

    return (
        <>
            <PartnerBanner pageName={pageName} banner={partnerBanner} />
            <PartnerTwoCol twoCol={partnerIntro} secClass="partner_two_col"/>
            <PartnerIconBox IconWidget={partnerIconWidget} />
            <PartnerPackage pckg={packages}/>
            {/* <HeroInfo heroinfo={heroInfo} secClass="partner"/> */}
        </>
    )
}
