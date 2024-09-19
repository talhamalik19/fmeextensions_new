import BdCrum from '../PageHeader/BdCrum'
import ImageBlock from '@/components/global/ImageBlock';

export default function ArticalSideBar({ pageName, hlpcenter, selectedItem, handleItemClick }) {
    
    return (
        <>
            <div className="cms_sidebar">
                <BdCrum pageName={pageName} bdInfo={hlpcenter} />
                <ul className="cms_bar_list">
                    {
                        hlpcenter.sidebarList.map((cmsBarTitle) =>
                            <li className={`cms_bar_item ${selectedItem === cmsBarTitle.id ? 'active' : '' }`} key={cmsBarTitle} onClick={() => handleItemClick(cmsBarTitle.id)}>
                                <ImageBlock image={cmsBarTitle.icon} />
                                {cmsBarTitle.title}
                            </li>
                        )
                    }
                </ul>
            </div>
        </>
    )
}
