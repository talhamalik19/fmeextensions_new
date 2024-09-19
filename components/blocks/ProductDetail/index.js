import ProductImageGal from "./ProductImageGal";
import ProductInfo from "./ProductInfo";
import dlv from "dlv";
import { imageLoader } from "@/components/shared/imageLoader";
import Image from "next/image";
import BannerImagePlaceholder from "@/components/shared/BannerImagePlaceholder";
import CTAPlaceholder from "@/components/shared/CTAPlaceholder";
import ProductDtlPlaceholder from "@/components/shared/ProductDtlPlaceholder";
import { useEffect, useState } from "react";
import { customBlocks } from "@/pages/api/page";
import Link from "next/link";
import searchFileByNumber from "@/utils/searchFileByNumber";
import ProductSchema from "@/components/schema/Product";
import dynamic from "next/dynamic";
const ProdComboDeal = dynamic(() => import('../ProdComboDeal'));
const AskQuestion = dynamic(() => import('@/components/shared/AskQuestion'));
const MigrationDialog = dynamic(() => import('@/components/global/MigrationDialog'));

const ProductDetail = ({ product, productBasicInfo, pageName, user, jwt, closeModal, isDescriptionEnabled, setCartItems, update, configuration_id, MobileDevice, globalMagento, sarabun }) => {
    const [state, setState] = useState(false)
    const [migrationDialogData, setMigrationDialogData] = useState(null)
    const [blockContent, setBlockContent] = useState([]);
    const [shareCta, showShareCta] = useState(false)
    const fetchBlockContent = async () => {
        const customBlocksData = await customBlocks('product-detail-page');
        try {
            setBlockContent(JSON.parse(customBlocksData.data.blocks_data)[0]);
        } catch (e) { }
    };
    useEffect(() => {
        fetchBlockContent();
    }, [product]);

    try {
        const short_description_decoded = JSON.parse(dlv(product, 'short_description.html')) || '';
        short_description = dlv(short_description_decoded, 'blocks_product_short_description.short_description');
        list = dlv(short_description_decoded, 'blocks_product_short_description.cards')
            .map((card) => card.text)
            .filter((card) => card !== undefined && card !== null && card.length > 0)
            .reduce((acc, val) => acc.concat(val), []);

    } catch (e) { }

    const productGallery = dlv(product, 'media_gallery')

    const versionIcon = "/images/webp/compatibility_logo 1.webp";
    const MagentoEXTIcon = "/images/webp/partner_extensions_builder 1.webp";

    const closeModalAlt = () => {
    }

    const handleUserGuide = async () => {
        let samples = dlv(product, 'downloadable_product_samples');
        samples && samples.map((sample, index) => {
            if (sample.title == "FME Privacy Policy" || sample.title == "Privacy Policy") {
                samples[index].sample_url = '/user_guide/fme_privacy_policy.pdf';
            }
            else {
                const foundFile = searchFileByNumber(sample.id);
                if (foundFile) {
                    samples[index].sample_url = `/user_guide/${foundFile}`;
                }
            }
        })
        setState(true)
        setMigrationDialogData(samples)
        document.body.style.overflow = 'hidden';
    }

    const handleLiveDemo = () => {
        const liveDemo = {
            button: [
                {
                    field_redirect: dlv(product, 'demo_link'),
                    field_text: dlv(product, 'frontend_demo1_title'),
                    field_target: '_blank'
                },
                {
                    field_redirect: dlv(product, 'frontend_demo2'),
                    field_text: dlv(product, 'frontend_demo2_title'),
                    field_target: '_blank'
                },
                {
                    field_redirect: dlv(product, 'frontend_demo3'),
                    field_text: dlv(product, 'frontend_demo3_title'),
                    field_target: '_blank'
                },
                {
                    field_redirect: dlv(product, 'frontend_demo4'),
                    field_text: dlv(product, 'frontend_demo4_title'),
                    field_target: '_blank'
                },
                {
                    field_redirect: dlv(product, 'frontend_demo5'),
                    field_text: dlv(product, 'frontend_demo5_title'),
                    field_target: '_blank'
                },
                {
                    field_redirect: dlv(product, 'backend'),
                    field_text: dlv(product, 'backend_demo_title'),
                    field_target: '_blank'
                }
            ]
        };

        // Check if at least one field_redirect is not null or empty
        const hasNonEmptyRedirect = liveDemo.button.some(
            button => button.field_text && button.field_text.trim() !== ''
        );

        // Update state based on the condition
        setState(hasNonEmptyRedirect);

        if (hasNonEmptyRedirect) {
            setMigrationDialogData(liveDemo);
            document.body.style.overflow = 'hidden';
        }
    };

    const [faqModal, setFaqModal] = useState(false)

    const handleFaqModal = () => {
        setFaqModal(true)
        document.body.style.overflow = 'hidden';
    }

    const [videoOpen, setVideoOpen] = useState(false)
    
    return (
        <>
            <div className="pd_pg_bd main_container">
                <div className="pt-5 pb-4 lg:pt-7 lg:pb-5 pd_bdcrum page_info">
                    <ul className='bdcrum'>
                        <li className='bdcrum_item'><Link href={'/'}>Home</Link></li>
                        {dlv(product, 'categories') && <li className='bdcrum_item'><Link href={dlv(product, 'categories.0.url_key')}>{dlv(product, 'categories.0.url_key').split('-')?.map((item)=> `${item?.charAt(0) && item?.charAt(0)?.toUpperCase() + item?.slice(1)} `)}</Link></li>}
                        {dlv(product, 'name') && <li className='bdcrum_item'><Link href={`#`} style={{pointerEvents:'none'}}>{dlv(product, 'name')}</Link></li>}
                    </ul>
                </div>
            </div>
            <div className="section_padding zero_top">
                <div className="main_container">
                    <div className="product_container">

                        <div className="prod_dtl_col gal_col">
                            {productGallery ?
                                <ProductImageGal blockContent={blockContent} setVideoOpen={setVideoOpen} videoOpen={videoOpen} pdImage={productGallery} productThumb={product} pageName={pageName} productBasicInfo={productBasicInfo} MobileDevice={MobileDevice} shareCta={shareCta} showShareCta={showShareCta}/>
                                :
                                <BannerImagePlaceholder />
                            }

                            <div className="section_cta">
                                {blockContent.links ? blockContent.links &&
                                    <button onClick={handleLiveDemo} className="primary_cta secondary_cta" >{dlv(blockContent.links[0].button[6], 'field_text', '')}</button>
                                    :
                                    <CTAPlaceholder />
                                }
                                {blockContent.links ? blockContent.links && <button onClick={handleUserGuide} className="primary_cta secondary_cta_prod" >{dlv(blockContent, 'links.0.button.10.field_text')}</button>
                                    :
                                    <CTAPlaceholder />
                                }
                            </div>
                            <div className="bl_row">
                                {dlv(product, 'enterprise') ?
                                    dlv(product, 'enterprise') && <div className="version_block">
                                        <div className="version_icon">
                                            <Image
                                                loader={imageLoader}
                                                src={versionIcon}
                                                alt={`version1`}
                                                width={22}
                                                height={25}
                                                style={{ height: 'auto' }}
                                            />
                                        </div>
                                        <div className="version">{dlv(product, 'enterprise')}</div>
                                    </div>
                                    :
                                    ''
                                }
                                {dlv(product, 'product_compatiblility') ?
                                    dlv(product, 'product_compatiblility') && <div className="version_block">
                                        <div className="version_icon">
                                            <Image
                                                loader={imageLoader}
                                                src={versionIcon}
                                                alt={`version2`}
                                                width={22}
                                                height={25}
                                                style={{ height: 'auto' }}
                                            />
                                        </div>
                                        <div className="version">{dlv(product, 'product_compatiblility')}</div>
                                    </div>
                                    :
                                    ''
                                }
                                <div className="prod_cta_lt">
                                    {blockContent.links &&
                                        <div className="section_cta">
                                            <span className='primary_cta' onClick={handleFaqModal}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19" fill="none">
                                                    <path d="M1.9 0C1.39609 0 0.912816 0.200178 0.556497 0.556497C0.200178 0.912816 0 1.39609 0 1.9V13.3C0 13.8039 0.200178 14.2872 0.556497 14.6435C0.912816 14.9998 1.39609 15.2 1.9 15.2H5.7V18.05C5.7 18.302 5.80009 18.5436 5.97825 18.7218C6.15641 18.8999 6.39804 19 6.65 19H7.125C7.3625 19 7.6 18.905 7.79 18.7245L11.305 15.2H17.1C17.6039 15.2 18.0872 14.9998 18.4435 14.6435C18.7998 14.2872 19 13.8039 19 13.3V1.9C19 1.39609 18.7998 0.912816 18.4435 0.556497C18.0872 0.200178 17.6039 0 17.1 0H1.9ZM1.9 1.9H17.1V13.3H10.526L7.6 16.226V13.3H1.9V1.9ZM9.6805 3.325C8.835 3.325 8.1605 3.496 7.6475 3.838C7.125 4.18 6.859 4.75 6.9065 5.4055H8.778C8.778 5.1395 8.873 4.94 9.025 4.807C9.215 4.674 9.424 4.6075 9.6805 4.6075C9.975 4.6075 10.2315 4.6835 10.4025 4.8545C10.5735 5.016 10.659 5.225 10.659 5.51C10.659 5.776 10.583 6.0135 10.45 6.213C10.2885 6.422 10.089 6.593 9.842 6.726C9.348 7.03 9.025 7.296 8.8255 7.524C8.645 7.752 8.55 8.075 8.55 8.55H10.45C10.45 8.284 10.4975 8.075 10.583 7.904C10.6685 7.7425 10.83 7.6 11.077 7.4575C11.514 7.258 11.875 6.992 12.1505 6.65C12.426 6.2985 12.5685 5.928 12.5685 5.51C12.5685 4.845 12.312 4.313 11.799 3.914C11.286 3.5245 10.5735 3.325 9.6805 3.325ZM8.55 9.5V11.4H10.45V9.5H8.55Z" fill="#141414" />
                                                </svg>
                                                {dlv(blockContent.links[0].button[1], 'field_text', '')}
                                            </span>
                                            <Link className="primary_cta" target={dlv(blockContent.links[0].button[2], 'field_target')} href={`${dlv(blockContent.links[0].button[2], 'field_redirect', '')}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
                                                    <path d="M7.77778 12.0716L13.9744 7.98913L7.77778 3.90668V12.0716ZM6.66667 18.2609V15.9783H1.79556C1.2837 15.9783 0.856667 15.8025 0.514445 15.451C0.172222 15.0995 0.000740741 14.6604 0 14.1339V1.84435C0 1.31859 0.171482 0.879945 0.514445 0.528424C0.857408 0.176902 1.28407 0.000760869 1.79444 0H18.2056C18.7167 0 19.1433 0.176141 19.4856 0.528424C19.8278 0.880706 19.9993 1.31935 20 1.84435V14.1351C20 14.6601 19.8285 15.0987 19.4856 15.451C19.1426 15.8033 18.7159 15.979 18.2056 15.9783H13.3333V18.2609H6.66667ZM1.79556 14.837H18.2056C18.3759 14.837 18.5326 14.7639 18.6756 14.6178C18.8185 14.4717 18.8896 14.3104 18.8889 14.1339V1.84435C18.8889 1.66859 18.8178 1.50728 18.6756 1.36043C18.5333 1.21359 18.3767 1.14054 18.2056 1.1413H1.79444C1.62407 1.1413 1.46741 1.21435 1.32444 1.36043C1.18148 1.50652 1.11037 1.66783 1.11111 1.84435V14.1351C1.11111 14.3101 1.18222 14.471 1.32444 14.6178C1.46667 14.7647 1.62333 14.8377 1.79444 14.837" fill="#141414" />
                                                </svg>
                                                {dlv(blockContent.links[0].button[2], 'field_text', '')}
                                            </Link>
                                        </div>
                                    }
                                </div>
                                <div className="ext_mng_logo">
                                    <Link href={`${dlv(blockContent, 'external_link.field_redirect')}`} target={`${dlv(blockContent, 'external_link.field_target')}`}>
                                        <Image
                                            loader={imageLoader}
                                            src={MagentoEXTIcon}
                                            alt={`Extension Builder`}
                                            width={261}
                                            height={101}
                                            style={{ height: 'auto' }}
                                        />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="prod_dtl_col">
                            {productBasicInfo ? productBasicInfo &&
                                <ProductInfo setCartItems={setCartItems} isDescriptionEnabled={isDescriptionEnabled} closeModal={closeModal || closeModalAlt} jwt={jwt} user={user} product={product} productBasicInfo={productBasicInfo} blockContent={blockContent} pageName={pageName} update={update} configuration_id={configuration_id} sarabun={sarabun}/>
                                :
                                <ProductDtlPlaceholder />
                            }
                        </div>
                    </div>
                </div>
            </div>
          <ProdComboDeal product={product} closeModal={closeModal || closeModalAlt} globalMagento={globalMagento} sarabun={sarabun}/>
            { state && <MigrationDialog state={state} setState={setState} migrationDialogData={migrationDialogData} />}
          {faqModal &&  <AskQuestion product={product} blockContent={blockContent} faqModal={faqModal} setFaqModal={setFaqModal}/>}
            <ProductSchema product={product} />

        </>
    )
}

export default ProductDetail;