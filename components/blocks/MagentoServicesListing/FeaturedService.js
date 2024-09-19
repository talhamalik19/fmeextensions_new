import SectionCta from '@/components/global/SectionCta'
import SectionHead from '@/components/global/SectionHead'
import { imageLoader } from '@/components/shared/imageLoader'
import dlv from 'dlv'
import Image from 'next/image'
import Link from 'next/link'

export default function FeaturedService({ product, blockContent,sarabun }) {
    let servicesIcons = null
    try {
        servicesIcons = dlv(product, 'services_icons').split('\r\n');
    } catch (e) { }

    return (
        <div className="secondary_bg">
            <div className="section_padding">
                <div className="main_container">
                    {product && <div className="feat_service">
                        <Link href={`${dlv(product, 'url_key')}`}> <SectionHead title={product.name} sarabun={sarabun}/></Link>
                        <div className="feat_service_block">
                            <div className="feat_service_col">
                                <h3 className={`${sarabun} secondary_title`}>{dlv(product, 'product_note')}</h3>
                                <div className="image_block">
                                    <Link
                                    aria-label={`${dlv(product, 'name')}`}
                                        href={`${dlv(product, 'url_key')}`}
                                    >
                                        <Image
                                            loader={imageLoader}
                                            src={dlv(product, 'image.url')}
                                            alt={''}
                                            width={400}
                                            height={400}
                                            style={{ width: 'auto', height: 'auto' }}
                                        />
                                    </Link>
                                </div>
                                <p className="primary_text">{dlv(product, 'product_listing_description')}</p>
                                <div className="section_cta">
                                    {dlv(blockContent, 'button1') && <SectionCta props={dlv(blockContent, 'button1.field_text')} ctaClass="secondary_cta" url={dlv(product, 'url_key')} />}
                                    {dlv(blockContent, 'button2') && <SectionCta props={dlv(blockContent, 'button2.field_text')} ctaClass="cta_link" url={dlv(blockContent, 'button2.field_redirect')} />}
                                </div>
                            </div>
                            <div className="feat_service_col">
                                {servicesIcons &&
                                    <ul className="service_list">
                                        {
                                            servicesIcons.map((item, index) => {
                                                let image_url = null;
                                                let image_alt = null;
                                                try {
                                                    image_url = item.split(',')[0];
                                                    image_alt = item.split(',')[1];
                                                } catch (e) { }
                                                return (
                                                    <li className='service_item' key={`service-item-${index}`}>
                                                        <Image
                                                            loader={imageLoader}
                                                            src={image_url}
                                                            alt={image_alt}
                                                            width={37}
                                                            height={37}
                                                            style={{ width: 'auto', height: 'auto' }}
                                                        />
                                                        {image_alt}</li>
                                                )
                                            }
                                            )
                                        }
                                    </ul>
                                }
                            </div>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}
