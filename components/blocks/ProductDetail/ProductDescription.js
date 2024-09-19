import SectionCta from '@/components/global/SectionCta'
import AskQuestion from '@/components/shared/AskQuestion'
import dlv from 'dlv'
import { useState } from 'react'

export default function ProductDescription({ prodDesc, cta, blockContent, product, sarabun }) {
    const [faqModal, setFaqModal] = useState(false)

    const handleFaqModal = () =>{
        setFaqModal(true)
    }
    
    return (
        <div className="product_description">
            {/* {cta && <h2 className="secondary_title">{cta.description_heading}</h2>} */}
            <div className={`${sarabun} secondary_title`}>Description</div>
            <div className="prod_desc_block">
                <p className="primary_text">{prodDesc && prodDesc.desc}</p>
                <ul className="list_block">
                    {
                        prodDesc.list && prodDesc.list.map((prodList, index) =>
                            <li key={`list-items-${index}`} className='list_item'>{prodList}</li>)
                    }
                </ul>
            </div>
            {blockContent.links &&
                <div className="section_cta resp_prod_cta_lt">
                    <SectionCta props={dlv(blockContent.links[0].button[2], 'field_text', '')} ctaClass="cta_link" url={dlv(blockContent.links[0].button[2], 'field_redirect', '')} />
                    <span className='primary_cta cta_link' onClick={handleFaqModal}>
                    {dlv(blockContent.links[0].button[1], 'field_text', '')}
                    </span>
                </div>
            }
          {faqModal &&  <AskQuestion product={product} blockContent={blockContent} faqModal={faqModal} setFaqModal={setFaqModal}/>}
        </div>
    )
}
