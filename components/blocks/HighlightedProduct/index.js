
import dlv from "dlv";
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import BdCrum from "../PageHeader/BdCrum";
import PageDescription from "../PageHeader/PageDescription";
import { extractTextFromPTagsH1TagsAndButtons, parseHtml } from "@/utils/parseHtml";
import Link from "next/link";
import { imageLoader } from "@/components/shared/imageLoader";
import Image from "next/image";
import RatingStar from "@/components/shared/RattingStar";
import InnerHtml from "@/components/shared/InnerHtml";
import { getCookie } from "cookies-next";
import useBestSellerButtonClick from "@/utils/hooks/useBestSellerButtonClick";
import Badge from "../ProductCard/Badge";
const BuyNowDialog = dynamic(() => import('../HomeProdListing/BuyNowDialog'));

const HighlightedProduct = ({ pageName = 'category', pageData, category_id, getPageData, bestSellerProducts, MobileDevice, sarabun }) => {
    const [currencySymbol, setCurrencySymbol] = useState('')
    const [customBlocksData, setCustomBlocksData] = useState([]);

    const fetchPageData = async () => {
        const pageData = await getPageData();
        setCustomBlocksData(JSON.parse(pageData.data.blocks_data));
    }
    const [dialogBuyNow, setDialogBuyNow] = useState(false);
    const [url_key, setUrlKey] = useState(null);
    const closeModal = () => {
        setDialogBuyNow(false);
        document.body.style.overflow = 'auto';
    };

    const handleButtonClick = async (event, isNewTab) => {
        if (!isNewTab && event.target.getAttribute('entity-id')) {
            const url_key = event.target.getAttribute('url-key');
            setUrlKey(url_key);
            setDialogBuyNow(true);
            document.body.style.overflow = 'hidden';
        }
    };

    useBestSellerButtonClick(handleButtonClick);

    useEffect(() => {
        fetchPageData();
        const symbol = getCookie('symbol_currency') || '$';
        setCurrencySymbol(symbol)
    }, [category_id])

    let pDescription = null;
    let headings = null;
    let buttons = null;

    try {
        const parsedHtml = parseHtml(dlv(pageData, 'description'));
        const { pTexts, h1Texts, buttonTexts } = extractTextFromPTagsH1TagsAndButtons(parsedHtml);
        pDescription = pTexts;
        headings = h1Texts;
        buttons = buttonTexts
    } catch (e) { }

    const button = {
        field_redirect: '/support-center',
        field_text: dlv(buttons, '0', 'Get a Custom Extension'),
    }
    return (
        <>
            <div className="section_padding bottom_min">
                <div className="main_container">
                    <div className="pg_header">
                        <BdCrum pageName={`${dlv(pageData, 'url_key')}`} bdInfo={`${dlv(headings, '0')}`} sarabun={sarabun}/>
                        <PageDescription text={`${dlv(pDescription, '0')}`} btn={button} sarabun={sarabun}/>
                    </div>
                </div>
            </div>
            <div className={'section_padding zero_top pd_lst_bg'}>
                <div className="main_container">
                    <div className="highlighted_prod">
                        {bestSellerProducts?.lenght > 0 && <h2 className="primary_title">{dlv(customBlocksData, '2.heading')}</h2>}
                        <div className="prod_listing grid_4">
                            <div class="prod_card hm_lst_cnt">
                                {dlv(customBlocksData[3],'heading') && <h2 class={`${sarabun} primary_title`}>{dlv(customBlocksData[3],'heading')}</h2>}
                                {dlv(customBlocksData[3],'desc') && <p class="primary_text">{dlv(customBlocksData[3],'desc')}</p>}
                            </div>
                            {
                                bestSellerProducts?.map((item, index) => {
                                    if (MobileDevice ? index == 0 : index < 3) {
                                        return (
                                            <div className="prod_card">
                                                <Badge badgeText={item.badge}/>
                                                <Link aria-label={`${dlv(item, 'name')}`} className="loading_action prod_image" href={`${dlv(item, 'url_key')}`}>
                                                    <Image
                                                        loader={imageLoader}
                                                        src={`${dlv(item, 'image')}`}
                                                        alt={''}
                                                        width={85}
                                                        height={85}
                                                        style={{height: 'auto' }}
                                                        priority={index == 0 ? true : false}
                                                        className='loading_action'
                                                    />
                                                </Link>
                                                <div className="prod_dtl">
                                                    <Link className={`${sarabun} prod_name secondary_title loading_action`} href={`${dlv(item, 'url_key')}`}>
                                                        {dlv(item, 'name')}
                                                    </Link>
                                                    <div className="review">
                                                        <div className='flex gap-[3] align-middle items-center'><RatingStar ratings={dlv(item, 'review.filled_stars')} /></div>
                                                        {dlv(item, 'review.reviews_count') > 0 && <span className={`${sarabun} num_review`}>{dlv(item, 'review.reviews_count')} Review{dlv(item, 'review.reviews_count') > 1 && 's'}</span>}
                                                    </div>
                                                    <div className="prod_row">
                                                        <p className={`${sarabun} prod_price`}>{currencySymbol}{dlv(item, 'price')}</p>
                                                        <div>
                                                            {<InnerHtml content={dlv(item, 'buy_now')} />}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            {dialogBuyNow && <BuyNowDialog url_key={url_key} isDescriptionEnabled={false} setDialogBuyNow={setDialogBuyNow} closeModal={closeModal} pageName={pageName} />}
        </>
    )
}

export default HighlightedProduct;