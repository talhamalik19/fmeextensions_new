import React, { useEffect, useRef, useState } from 'react'
import ArticalSideBar from './ArticalSideBar';
import ArticalTab from './ArticalTab';
import ArticalSearch from './ArticalSearch';
import ArticalDetail from './ArticalDetail';

export default function KnowledgeCenter({ pageName }) {
    // Knowledge Base Listing page
    const helpCenterSidebar = {
        title: pageName,
        sidebarList: [
            { id: 1, title: 'Getting Started', icon: 'images/help-list-1.png', },
            { id: 2, title: 'Send Money', icon: 'images/help-list-2.png', },
            { id: 3, title: 'Manage Money', icon: 'images/help-list-3.png', },
            { id: 4, title: 'Cards', icon: 'images/help-list-4.png', },
            { id: 5, title: 'Credit', icon: 'images/help-list-5.png', },
            { id: 6, title: 'Treasury & Vault', icon: 'images/help-list-6.png', },
            { id: 7, title: 'Team Projects', icon: 'images/help-list-7.png', },
            { id: 8, title: 'FME Account', icon: 'images/help-list-8.png', },
            { id: 9, title: 'Documents & Data', icon: 'images/help-list-9.png', },
            { id: 10, title: 'Security', icon: 'images/help-list-10.png', },
            { id: 11, title: 'Integrations', icon: 'images/help-list-11.png', }
        ]
    }

    const helpInfo = [
        {
            id: 1, title: 'Getting Started',
            info: [
                { id: 1, question: 'Gathering your documents To complete', },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 2, title: 'Send Money',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 3, title: 'Manage Money',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 4, title: 'Cards',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 5, title: 'Credit',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 6, title: 'Treasury & Vault',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 7, title: 'Team Projects',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 8, title: 'FME Account',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 9, title: 'Documents & Data',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 10, title: 'Security',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
        {
            id: 11, title: 'Integrations',
            info: [
                { id: 1, question: 'Gathering your documents To complete ' },
                { id: 2, question: 'Sending domestic payments You can easily' },
                { id: 3, question: 'After you submit your application' },
                { id: 4, question: 'Prohibited countries We’re proud to support U.S' },
                { id: 5, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 6, question: 'Can I Install Extension On Development Site For Testing?' },
                { id: 7, question: 'What Is Your Refund Policy' },
                { id: 8, question: 'What Is Your Refund Policy' },
            ]
        },
    ]


    // Knowledge Base Detail page
    const helpDesc = {
        title: 'Managing roles and permissions',
        detailText: [
            { id: 1, list: "When inviting someone to your Mercury team, you'll be asked to assign them a role. This role determines what they can and can't do in your Mercury account." },
            { id: 2, list: "We will collect general information (such as the type of browser you use, the files you request, the domain name and country from which you have requested information) to improve our services " },
            { id: 3, list: "Bookkeepers can view all accounts and transactions but can't move money or manage your team. This would be best suited for an accountant." },
            { id: 4, list: "Card only users can be issued debit cards, but have extremely limited access to your company's dashboard. They'll only be able to see their own transaction data and card information upon logging in." },
        ],
        subTitle: "Changing a team member's role",
        orderedList: [
            { id: 1, list: 'Go to your Team settings.' },
            { id: 2, list: "Find the team member's name in the list, and click it to open their details." },
            { id: 3, list: 'In the upper right corner of their details card, click the three dots and choose Edit User Permissions from the menu.' }
        ],
        highlightedInfo: 'The Mercury Debit Cards are issued by Choice Financial Group and Evolve Bank & Members FDIC, pursuant to tor licenses from Mastercard. The IO Card is issued by Patriot Bank, Member FDIC.',
    }

    const cmsCntRef = useRef(null);
    const cmsSidebarRef = useRef(null);

    useEffect(() => {
        const handleHeight = () => {
            if (cmsCntRef.current && cmsSidebarRef.current) {
                const cmsHeight = cmsCntRef.current.offsetHeight;
                cmsSidebarRef.current.style.minheight = `${cmsHeight}px`;
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
    const [selectedItem, setSelectedItem] = useState(1)
    const handleItemClick = (id) => {
        setSelectedItem(id);
    }
    return (
        <>
            <div className="section_padding">
                <div className="main_container">
                    <div className="cms_pg help_center">
                        <div className="cms_inner">
                            <div className="side_bar" ref={cmsSidebarRef}>
                                <ArticalSideBar hlpcenter={helpCenterSidebar} pageName={pageName} selectedItem={selectedItem} handleItemClick={handleItemClick} />
                            </div>
                            {pageName === 'Knowledge Base' ?
                                <div className='help_tab_block' ref={cmsCntRef}>
                                    <ArticalSearch />
                                    <ArticalTab helpCenter={helpInfo} selectedItem={selectedItem} />
                                </div>
                                :
                                <div className='help_tab_block' ref={cmsCntRef}>
                                    <ArticalSearch />
                                    <ArticalDetail artical={helpDesc} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
