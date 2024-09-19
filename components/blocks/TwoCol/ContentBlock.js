import dlv from 'dlv'
import React from 'react'

export default function ContentBlock({ colContent,pageName, sarabun }) {
    return (
        <div className="block">
            {colContent.text && <h2 className="primary_title">{colContent.text}</h2>}
            {pageName === 'About Us' && Array.isArray(dlv(colContent,'descriptions')) ?
                dlv(colContent,'descriptions').map((item) => 
                <p className="primary_text">{dlv(item,'field_text')}</p>
                )
                :
                <p className="primary_text">{`descriptions after: ${dlv(colContent,'desc')}`}</p>
            }

            {dlv(colContent,'numbers') && <div className='twoCol_bottom_block'>
                <h2 className={`${sarabun} primary_title`}>{dlv(colContent,'title')}</h2>
                <div className='bottom_block_count'>
                    {
                        dlv(colContent,'numbers').map((item, index) =>
                            <div className='col_content_fme_block' key={`n-${index}`}>
                                <h2 className={`${sarabun} primary_title`}>{dlv(item,'field_redirect')}</h2>
                                <span className="primary_text">{dlv(item,'field_text')}</span>
                            </div>
                        )
                    }
                </div>
            </div>
            }
        </div>
    )
}
