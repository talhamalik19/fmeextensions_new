import { imageLoader } from '@/components/shared/imageLoader'
import dlv from 'dlv'
import Image from 'next/image'

export default function ProdFeatureTwoCol({ sectionBg, leftImage, heading, description, text, options, image, title }) {
    return (
        <div className={sectionBg === true ? "section_bg" : ''}>
            <div className="section_padding">
                <div className="main_container">
                    <div className={`${leftImage === true ? 'prod_feat_two_col left_image' : 'prod_feat_two_col'}`}>
                        <div className="prod_ft_block image_block">
                            <Image
                                loader={imageLoader}
                                src={dlv(image, 'url')}
                                alt={dlv(image, 'alt')}
                                width={626}
                                height={444}
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                        <div className="prod_ft_block">
                            {heading && <h2 className="primary_title">{heading}</h2>}
                            {description && <p className="primary_text">{description}</p>}
                            {
                                title && <h3 className="secondary_title">{title}</h3>
                            }
                            {
                                options &&
                                options.map((option, index) => {
                                    return (
                                        <div key={`list-options-${index}`}>
                                            {
                                                option.text && <p className="primary_text">{option.text}</p>
                                            }
                                            {
                                                option.list &&
                                                <ul className="list_block">
                                                    {
                                                        option.list && option.list.map((list, index) =>
                                                            <li className='list_item' key={`list-item-${index}`}>{list}</li>
                                                        )
                                                    }
                                                </ul>
                                            }
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
