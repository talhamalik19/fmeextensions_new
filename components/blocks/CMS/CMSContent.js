import dlv from "dlv";

export default function CMSContent({ cmsContent, heading, title, description, sarabun }) {
    return (
        <>
            < div className="cms_cnt_block_inner">
                {heading || title || description ?

                    <div className="cms_tag_line">
                        {description &&
                            <p className="primary_text">{description}</p>
                        }
                        {title &&
                            <p className="primary_text sub_text">{title}</p>
                        }
                        {cmsContent.Mainlist &&
                            <ul>
                                {
                                    cmsContent.Mainlist.map((item, index) =>
                                        <li key={index}>{item.listText}</li>
                                    )
                                }
                            </ul>
                        }
                    </div>
                    : null
                }

                <div className="cms_content">
                    {
                        cmsContent && cmsContent.map((card, index) =>
                            <div key={`questions-${index}`}>
                                <h2 id={`cms_${index}`} className={`${sarabun} cms_title`}>{card.text}</h2>
                                <ul>
                                    {
                                        dlv(card, 'questions') && dlv(card, 'questions').map((cmsList, index) =>
                                            <li key={index}>{dlv(cmsList, 'field_text')}</li>
                                        )
                                    }
                                </ul>
                            </div>
                        )
                    }

                </div>

            </div >

        </>
    )
}
