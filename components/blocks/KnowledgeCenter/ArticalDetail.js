import ImageBlock from '@/components/global/ImageBlock'
import Link from 'next/link'
import React from 'react'
import ArticalPermissionTable from './ArticalPermissionTable'

export default function ArticalDetail({ artical }) {
    return (
        <>
            <div className="artical_detail">
                <div className="artical_dtl_content">
                    <h2>{artical.title}</h2>
                    <ul>
                        {
                            artical.detailText.map((item) =>
                                <li key={item.id}>{item.list}</li>
                            )
                        }
                    </ul>
                    <ArticalPermissionTable/>
                    <h3>{artical.subTitle}</h3>
                    <ol>
                        {
                            artical.orderedList.map((item) =>
                                <li key={item.id}>{item.list}</li>
                            )
                        }
                    </ol>
                </div>

                <div className="artical_note">
                    <p className="primary_text">{artical.highlightedInfo}</p>
                </div>

                <div className="artical_sucess">
                    <h3 className="title">Did you find this article helpful?</h3>
                    <div className="section_cta">
                        <button className="artical_cta"> <ImageBlock image='images/thumbUp.png'/> Yes</button>
                        <button className="artical_cta"><ImageBlock image='images/thumbDown.png'/> No</button>
                    </div>
                </div>

                <div className="artical_support">
                    <h2 className="title">Need more help?</h2>
                    <p className="primary_text">Email <Link href='mailto:support@fmeextensions.com'>support@fmeextensions.com</Link> and we’ll be happy to assist.</p>
                </div>

            </div>
        </>
    )
}
