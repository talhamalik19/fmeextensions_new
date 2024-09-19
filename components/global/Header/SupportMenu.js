import Image from 'next/image';
import React from 'react';
import Link from 'next/link';
import UseMediaQuery from '../UseMediaQuery';
import { imageLoader } from '@/components/shared/imageLoader';
import dlv from 'dlv';

export default function SupportMenu({ megaMenuHeight, setMegaMenuHeight, setSideBar, customBlocksData }) {
    let showMediaQueryBlock = UseMediaQuery('(min-width:1024px)');

    const toggleMegaMenu = () => {
        setMegaMenuHeight(megaMenuHeight === '0' ? 'auto' : '0');
        setSideBar(false)
    };

    return (
        <>
            <div className="services_megaMenu support_megaMenu">
                <div className="services_menu_block">
                    <div className="service_menu_prod flex flex-wrap lg:flex-nowrap gap-8">
                        {showMediaQueryBlock && (
                            <div className='service_cms_block px-10 py-8 w-full lg:w-2/5 hidden lg:flex flex-col items-center justify-center'>
                                <div className="image_block">
                                    <Image
                                        loader={imageLoader}
                                        src={`${dlv(customBlocksData, '0.cards.0.image.0.url')}`}
                                        alt={`${dlv(customBlocksData, '0.cards.0.image.0.alt')}`}
                                        width={355}
                                        height={200}
                                        style={{ maxWidth: '100%', height: 'auto', margin: 'auto' }}
                                        className='loading_action'
                                    />
                                </div>
                                <div className="service_cms_content text-center">
                                    <h2 className="text-xl md:text-2xl lg:text-2xl xl:text-4xl text-titleColor font-titleFont font-semibold lg:py-5 xl:py-7">{dlv(customBlocksData, '0.cards.0.heading')}</h2>
                                    <p className="text-base md:text-lg text-textColor font-textFont lg:mb-5 xl:mb-8">{dlv(customBlocksData, '0.cards.0.text')}</p>
                                    <Link href={`${dlv(customBlocksData, '0.cards.0.button.0.field_redirect')}`} className='primary_cta service_mega_cta loading_action' onClick={toggleMegaMenu}>{dlv(customBlocksData, '0.cards.0.button.0.field_text')}</Link>
                                </div>
                            </div>
                        )}
                        {/* Support Listing Block */}
                        {showMediaQueryBlock ? (
                            <ul className="service_prod_col w-full lg:w-3/5">
                                {
                                    dlv(customBlocksData, '0') &&
                                    dlv(customBlocksData, '0.cards').map(({ button, text, image }, index) => {
                                        if (index != 0) {
                                            return (
                                                <li className="support_item_1 mega_service_list" onClick={toggleMegaMenu} key={`support-${index}`}>
                                                    <Link href={`${dlv(button, '0.field_redirect')}`} className="mega_service_link loading_action">
                                                        <Image
                                                            loader={imageLoader}
                                                            src={`${dlv(image, '0.url')}`}
                                                            alt="Image Alt Text"
                                                            width={100}
                                                            height={42}
                                                            style={{ height: 'auto', margin: 'auto' }}
                                                            className='loading_action'
                                                        />
                                                        <span className="name loading_action">{dlv(button, '0.field_text')}</span>
                                                        <p className='primary_text text-center'>{text}</p>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        ) : (
                            <ul className="service_prod_col w-full lg:w-3/5">
                                {
                                    dlv(customBlocksData, '0') &&
                                    dlv(customBlocksData, '0.cards').map(({ button, heading, text, image }, index) => {
                                        if (index != 0) {
                                            return (
                                                <li className="mega_service_list" onClick={toggleMegaMenu}>
                                                    <Link href={`${dlv(button, '0.field_redirect')}`} className="mega_service_link loading_action">
                                                        <span className="name loading_action">{`${dlv(button, '0.field_text')}`}</span>
                                                    </Link>
                                                </li>
                                            )
                                        }
                                    })
                                }
                            </ul>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
