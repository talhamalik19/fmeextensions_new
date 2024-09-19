import SectionHead from "@/components/global/SectionHead";
import dlv from "dlv";

const CustomPdInfo = ({ heading, cards }) => {
    return (
        <div className="section_padding">
            <div className="main_container">
                <div className="cust_pf_info">
                    {heading && <SectionHead title={heading} />}
                    <div className="cst_pd_inner grid_custom">
                        {
                            cards.map((card, index) => {
                                return (
                                    <div className={`cust_block item-${index}`} key={`card-${index}`}>
                                        {dlv(card, 'heading') && <h3 className="secondary_title">{dlv(card, 'heading')}</h3>}
                                        {dlv(card, 'description') && <p className="primary_text">{dlv(card, 'description')}</p>}

                                        <div className="cust_counter">
                                            {dlv(card, 'number') && <span className="count">{dlv(card, 'number')}</span>}
                                            {dlv(card, 'label') && <span className="text">{dlv(card, 'label')}</span>}

                                        </div>
                                    </div>
                                )
                            }
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomPdInfo;