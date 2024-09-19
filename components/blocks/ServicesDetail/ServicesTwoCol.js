import { imageLoader } from "@/components/shared/imageLoader"
import Image from "next/image"
import dlv from 'dlv'

export default function ServicesTwoCol({ leftImage, heading, descriptions, options, image, subDescriptions }) {
    return (
        <>
            <div className="section_padding">
                <div className="main_container">
                    <div className="service_two_col">
                        {heading && <h2 className="primary_title">{heading}</h2>}
                        <div className={leftImage === true ? 'service_two_col_inner left_image' : 'service_two_col_inner'}>
                            <div className="service_col image_col">
                                <Image
                                    loader={imageLoader}
                                    src={dlv(image, 'url')}
                                    alt={dlv(image, 'alt')}
                                    width={626}
                                    height={444}
                                    style={{ width: '100%', height: 'auto' }}
                                />
                            </div>
                            <div className="service_col">
                                {descriptions && <>
                                    {
                                        descriptions.map((desc, index) =>
                                            <p className="primary_text" key={`desc-${index}`}>{desc}</p>
                                        )
                                    }
                                </>}

                                {
                                    options &&
                                    options.map((option, index) => {
                                        return (
                                            option.list &&
                                            <ul className="list_block">
                                                {
                                                    option.list && option.list.map((list, index) =>
                                                        <li className='list_item' key={`list-item-${index}`}><span>{list}</span></li>
                                                    )
                                                }
                                            </ul>
                                        )
                                    })
                                }

                                {subDescriptions && <>
                                    {
                                        subDescriptions.map((subDesc, index) =>
                                            <p className="primary_text" key={`sub-des-${index}`}>{subDesc}</p>
                                        )
                                    }
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
