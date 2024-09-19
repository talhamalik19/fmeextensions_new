import BdCrum from '../PageHeader/BdCrum'
import dlv from 'dlv'
import Link from 'next/link';

export default function FAQSideBar({ faqSidebar, pageName, button, selectedItem, handleItemClick, title, description,sarabun }) {
    return (
        <>
            <div className="cms_sidebar">
                <BdCrum pageName={pageName} bdInfo={title} sarabun={sarabun}/>
                <div className="cms_bar_list">
                    <ul className="">
                        {faqSidebar.length !== 0 ?
                            faqSidebar.map((faqBarTitle) =>
                                faqBarTitle?.show_on_main == 1 && <li className={`cms_bar_item ${selectedItem === faqBarTitle.topic_order ? 'faq_tab_active' : ''}`} key={faqBarTitle.topic_order} onClick={() => handleItemClick(faqBarTitle.topic_order)}>
                                    <span className='faq_title'>{faqBarTitle.title}</span>
                                </li>
                            )
                            :
                            <div className="placeholderlist">
                                <div className="animated-background"></div>
                                <div className="animated-background"></div>
                            </div>
                        }
                    </ul>
                    <p className="primary_text">
                        {description}
                        <Link href={dlv(button, 'field_redirect')} target={dlv(button,'field_target')}> {dlv(button, 'field_text')}</Link>
                    </p>
                </div>

            </div>
        </>
    )
}
