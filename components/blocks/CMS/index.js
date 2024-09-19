import { useEffect, useRef } from 'react'
import CmsSidebar from './CmsSidebar'
import CMSContent from './CMSContent'

export default function CMS({ cards,heading, title, description, pageName, sarabun }) {
    // const privacy = {
    //     title: 'Privacy Policy',
    //     desc: 'We respect your privacy and know how important it is. Keeping this in mind we have developed below policy which summarizes any personally identifiable information we may collect, and how we might use it. This policy also covers some. ',
    //     subDesc: 'Please take a moment to read our privacy practices and let us know if you have any questions.',
    //     questions: [
    //         {
    //             id: 1, title: 'Information Collection',
    //             list: [
    //                 { id: 1, listText: 'We will only collect personally identifiable information (such as name, title, company name, address, telephone number, or e-mail address) that you voluntarily provide through our website or e-mail correspondence.' },
    //                 { id: 2, listText: 'We will collect general information (such as the type of browser you use, the files you request, the domain name and country from which you have requested information) to improve our services' },
    //             ]
    //         },
    //         {
    //             id: 2, title: 'Use Of Information',
    //             list: [
    //                 { id: 1, listText: 'The information you supply will be used by us to fulfill your orders against our products and services, respond to your inquiries, and supply you with requested information about the products and services.' },
    //                 { id: 2, listText: 'We may also use the information to inform you about new features, products or services if you explicitly instructed us to do so.' }
    //             ]
    //         },
    //         {
    //             id: 3, title: 'Other Important Information',
    //             list: [
    //                 { id: 1, listText: 'This web site may contain links to other sites. We do not endorse or otherwise accept responsibility for the content or privacy policies of those sites.' },
    //                 { id: 2, listText: 'Additionally, some of our Web pages may contain "cookies," which are data that may be sent to your Web browser and stored on your computer. This allows our server to "recognize" you when you visit our Web site in the future. Most Web browsers can be configured to not accept cookies, or to notify you if a cookie is sent to you.' },
    //                 { id: 3, listText: 'It may be necessary, if required by law or if pertinent to judicial or governmental investigations, to release your personally identifiable information.' },
    //             ]
    //         },
    //         {
    //             id: 4, title: 'Company Information',
    //             list: [
    //                 { id: 1, listText: 'Fmeextensions.com is a UnitedSol Company under the registration number (5821-20060801)' },
    //                 { id: 2, listText: 'We reserve the right to modify this privacy policy at any time. We will promptly reflect any such modifications on these Web pages.' },
    //             ]
    //         },
    //         {
    //             id: 5, title: 'How do you keep this information Safe?',
    //             list: [
    //                 { id: 1, listText: 'We keep the information safe using highly secured and dedicated servers.' }
    //             ]
    //         },
    //         {
    //             id: 6, title: 'Who has the access to the information collected by FME?',
    //             list: [
    //                 { id: 1, listText: 'Only FmeExtensions concerned employees has the access to the information. We do not sell or give personal information to any other party' },
    //             ]
    //         },
    //         {
    //             id: 7, title: 'Use Of Cookies',
    //             list: [
    //                 { id: 1, listText: 'FmeExtensions does use your cookies to function properly' }
    //             ]
    //         },
    //     ]
    // }
    // const termsCondition = {
    //     title: 'Terms & Condition',
    //     desc: 'We respect your privacy and know how important it is. Keeping this in mind we have developed below policy which summarizes any personally identifiable information we may collect, and how we might use it. This policy also covers some. ',
    //     subDesc: 'Please take a moment to read our privacy practices and let us know if you have any questions.',
    //     questions: [
    //         {
    //             id: 1, title: 'Information Collection',
    //             list: [
    //                 { id: 1, listText: 'We will only collect personally identifiable information (such as name, title, company name, address, telephone number, or e-mail address) that you voluntarily provide through our website or e-mail correspondence.' },
    //                 { id: 2, listText: 'We will collect general information (such as the type of browser you use, the files you request, the domain name and country from which you have requested information) to improve our services' },
    //             ]
    //         },
    //         {
    //             id: 2, title: 'Use Of Information',
    //             list: [
    //                 { id: 1, listText: 'The information you supply will be used by us to fulfill your orders against our products and services, respond to your inquiries, and supply you with requested information about the products and services.' },
    //                 { id: 2, listText: 'We may also use the information to inform you about new features, products or services if you explicitly instructed us to do so.' }
    //             ]
    //         },
    //         {
    //             id: 3, title: 'Other Important Information',
    //             list: [
    //                 { id: 1, listText: 'This web site may contain links to other sites. We do not endorse or otherwise accept responsibility for the content or privacy policies of those sites.' },
    //                 { id: 2, listText: 'Additionally, some of our Web pages may contain "cookies," which are data that may be sent to your Web browser and stored on your computer. This allows our server to "recognize" you when you visit our Web site in the future. Most Web browsers can be configured to not accept cookies, or to notify you if a cookie is sent to you.' },
    //                 { id: 3, listText: 'It may be necessary, if required by law or if pertinent to judicial or governmental investigations, to release your personally identifiable information.' },
    //             ]
    //         },
    //         {
    //             id: 4, title: 'Company Information',
    //             list: [
    //                 { id: 1, listText: 'Fmeextensions.com is a UnitedSol Company under the registration number (5821-20060801)' },
    //                 { id: 2, listText: 'We reserve the right to modify this privacy policy at any time. We will promptly reflect any such modifications on these Web pages.' },
    //             ]
    //         },
    //         {
    //             id: 5, title: 'How do you keep this information Safe?',
    //             list: [
    //                 { id: 1, listText: 'We keep the information safe using highly secured and dedicated servers.' }
    //             ]
    //         },
    //         {
    //             id: 6, title: 'Who has the access to the information collected by FME?',
    //             list: [
    //                 { id: 1, listText: 'Only FmeExtensions concerned employees has the access to the information. We do not sell or give personal information to any other party' },
    //             ]
    //         },
    //         {
    //             id: 7, title: 'Use Of Cookies',
    //             list: [
    //                 { id: 1, listText: 'FmeExtensions does use your cookies to function properly' }
    //             ]
    //         },
    //     ]
    // }

    const cmsCntRef = useRef(null);
    const cmsSidebarRef = useRef(null);

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

    return (
        <>
            <div className="section_padding">
                <div className="main_container">
                    <div className="cms_pg">
                        <div className="cms_inner">
                            <div className="side_bar" ref={cmsSidebarRef}>
                                <CmsSidebar cmsSidebar={cards} bdHeading={heading} pageName={pageName} sarabun={sarabun}/>
                            </div>
                            <div className='cms_cnt_block' ref={cmsCntRef}>
                                <CMSContent cmsContent={cards} heading={heading} title={title} description={description} sarabun={sarabun} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
