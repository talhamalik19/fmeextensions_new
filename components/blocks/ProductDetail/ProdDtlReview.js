import RattingStar from "@/components/shared/RattingStar";
import dynamic from "next/dynamic";
const ReviewDialog = dynamic(() => import("@/components/shared/ReviewDialog"), {
  ssr: true,
});
import dlv from "dlv";
import SectionCta from "@/components/global/SectionCta";

export default function ProdDtlReview({
  numberOfReview,
  currentVersion,
  blockContent,
  product,
  magento_version,
}) {

  const navigateToReviews = () => {
    try{
      window.tabClick(2)
    }catch(e){}
  }
  
  return (
    <div className="product_review">
      <div className="prod_review_in">
        <div className="pd_rt" onClick={navigateToReviews}>
          <RattingStar
            ratings={product?.overall_average_rating || 0}
          />
        </div>
        <span className="txt px-2">Based on {numberOfReview} reviews</span>
        <div className="review_link">
          <ReviewDialog blockContent={blockContent} product={product} />
        </div>
      </div>
      <div className="prod_type">
        {dlv(blockContent,'links') &&
          dlv(product, 'parallel_product', '') && <SectionCta props={dlv(blockContent.links[0].button[7], 'field_text', '').replace('M1', magento_version)} url={dlv(product, 'parallel_product', '').replace('https://www.fmeextensions.com', '').replace('.html', '')} ctaClass="cta_link" />
        }
      </div>
      {currentVersion && <div className="current_version resp">{currentVersion}</div>}
    </div>
  );
}
