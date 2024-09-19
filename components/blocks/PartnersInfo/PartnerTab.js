import React, { useState } from 'react'
import { Link } from 'react-scroll';

export default function PartnerTab({ partnerTab }) {
    const [selectedItem, setSelectedItem] = useState(1);

    const handleClick = (id) => {
        setSelectedItem(id);
    }
    return (
        <>
            <ul className="partner_tab">
                {
                    partnerTab.map((tabInfo) =>
                        <li key={tabInfo.id} className='partner_tab_item' onClick={() => handleClick(tabInfo.id)}>
                            <Link href={'#!'} to={`tab_${tabInfo.id}`} activeClass='active' spy={true} smooth={true} offset={-50}> <span dangerouslySetInnerHTML={{__html: tabInfo.svg}}></span> {tabInfo.packageName}</Link>
                        </li>
                    )
                }
            </ul>
        </>
    )
}
