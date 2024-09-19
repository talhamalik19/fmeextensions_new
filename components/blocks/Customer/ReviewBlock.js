import Avatar from '@/components/global/Avatar';
import ImageBlock from '@/components/global/ImageBlock'
import RatingStar from '@/components/shared/RattingStar';

export default function ReviewBlock({ custReview, sarabun }) {
    return (
        <>
            {
                custReview && custReview.map((item, index) =>
                    <div className="review_block" key={index}>
                        <div>
                            <div className="rating flex gap-[3px]">
                                <RatingStar ratings={item.total_stars} />
                            </div>
                            <div className="review_cnt">
                                <h4 className={`${sarabun} secondary_title`}>{item.title || item.summary}</h4>
                                <p className="primary_text">{item.detail || item.text}</p>
                            </div>
                        </div>
                        <div className="cust_info">
                            <div className="icon">
                                {item.image != null ? <ImageBlock image={item.image} />
                                    :
                                    <Avatar />
                                }
                            </div>
                            <div className="cust_dtl">
                                <h4 className="cust_name">{item.nickname}</h4>
                                {item.post && <p className="cust_post">{item.post}</p>}
                            </div>
                        </div>
                    </div>
                )
            }

        </>
    )
}
