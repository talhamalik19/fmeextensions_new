import { useEffect, useState } from 'react'
import Link from 'next/link';
import SocialIcon from './SocialIcon';
import dlv from 'dlv';

export default function FooterContent({ footerData }) {
    let column1 = null;
    let column2 = null;
    let column3 = null;
    try {
        column1 = footerData.cards[0];
        column2 = footerData.cards[1];
        column3 = footerData.cards[2];
    } catch (e) { }

    const [isDesktop, setIsDesktop] = useState(true)

    const checkScreenSize = () => {
        setIsDesktop(window.innerWidth > 599);
    };

    useEffect(() => {
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        return () => {
            window.addEventListener('resize', checkScreenSize);
        }
    }, [])

    return (

        <div className="footer_bg">
            <div className="main_container">
                <div className="footer_cnt_block">
                    <div className="foot_col">
                        {dlv(column1, 'heading') && <h3 className="primary_title">{dlv(column1, 'heading')}</h3>}
                        {dlv(column1, 'button') && <Link className={`primary_cta loading_action`} target={dlv(dlv(column1, 'button')[0], 'field_target')} href={dlv(dlv(column1, 'button')[0], 'field_redirect') || ''}>{dlv(dlv(column1, 'button')[0], 'field_text')}</Link>}
                    </div>

                    <div className="foot_col">
                        {dlv(column2, 'heading') && <h3 className="secondary_title">{dlv(column2, 'heading')}</h3>}
                        <div className="text">
                            {dlv(column2, 'button') && <Link className={``} target={dlv(dlv(column2, 'button')[0], 'field_target')} href={dlv(dlv(column2, 'button')[0], 'field_redirect') || ''}>{dlv(dlv(column2, 'button')[0], 'field_text')}</Link>}
                        </div>
                        {
                            isDesktop && <SocialIcon footerData={dlv(footerData, 'links')} />
                        }
                    </div>

                    <div className="foot_col">
                        {dlv(column3, 'heading') && <h3 className="secondary_title">{dlv(column3, 'heading')}</h3>}
                        <div className="text">
                            {dlv(column3, 'button') && <Link className='' target={`${dlv(dlv(column3, 'button')[0], 'field_target')}`} href={`${dlv(dlv(column3, 'button')[0], 'field_redirect')}`} style={{ textDecoration: 'underline' }}>{dlv(dlv(column3, 'button')[0], 'field_text')}</Link>}
                            {dlv(column3, 'button') && <Link className='' target={`${dlv(dlv(column3, 'button')[1], 'field_target')}`} href={`${dlv(dlv(column3, 'button')[1], 'field_redirect')}`}>{dlv(dlv(column3, 'button')[1], 'field_text')}</Link>}
                        </div>

                        {
                            !isDesktop && <SocialIcon footerData={dlv(footerData, 'links')} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
