import { useState } from 'react'
import BdCrum from '../PageHeader/BdCrum'
import { Link } from 'react-scroll';

export default function CmsSidebar({ cmsSidebar, bdHeading, pageName, sarabun }) {

    const [selectedItem, setSelectedItem] = useState(null)

    const handleScroll = (index) => {
        setSelectedItem(index);
    }

    return (
        <>
            <div className="cms_sidebar">
                <BdCrum pageName={pageName} bdInfo={bdHeading} sarabun={sarabun} />
                <ul className="cms_bar_list">
                    {
                        cmsSidebar && cmsSidebar.map((cmsBarTitle, index) =>
                            <li className="cms_bar_item" key={index} onClick={() => handleScroll(index)}>
                                
                                <Link href={'#!'} to={`cms_${index}`} smooth={true} offset={-50} activeClass="cms_tab_active" spy={true}> {cmsBarTitle.text}</Link>
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    )
}
