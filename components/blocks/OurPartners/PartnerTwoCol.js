import ImageBlock from '@/components/global/ImageBlock'
import React from 'react'

export default function PartnerTwoCol({twoCol, secClass}) {
    return (
        <>
            <div className="section_padding">
                <div className="main_container">
                    <div className={`service_two_col ${secClass}`}>
                        <div className={twoCol.imageLeft === true ? 'service_two_col_inner left_image' : 'service_two_col_inner'}>
                            <div className="service_col image_col">
                                <ImageBlock image={twoCol.image} />
                            </div>
                            <div className="service_col">
                                <h2 className="primary_title">{twoCol.title}</h2>
                                {twoCol.desc && <>
                                    {
                                        twoCol.desc.map((desc) =>
                                            <p className="primary_text" key={desc.id}>{desc.text}</p>
                                        )
                                    }
                                </>}

                                {twoCol.list &&
                                    <ul className="list_block">
                                        {
                                            twoCol.list.map((list) =>
                                                <li className="list_item" key={list.id}>{list.text}</li>
                                            )
                                        }
                                    </ul>
                                }

                                {twoCol.subDesc && <>
                                    {
                                        twoCol.subDesc.map((subDesc) =>
                                            <p className="primary_text" key={subDesc.id}>{subDesc.text}</p>
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
