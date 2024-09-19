import AccordionTwoCol from "@/components/global/AccordionTwoCol";
import dynamic from "next/dynamic";
const AskQuestion = dynamic(() => import("@/components/shared/AskQuestion"), {
  ssr: true,
});
import { useEffect, useState } from "react";
import { getFaqsByProductId } from "@/pages/api/product";

export default function ProductFaq({ product, blockContent, sarabun }) {
  const faqBg = true;

  const [prodFAQ, setfaqData] = useState([]);

  const fetchfaqData = async () => {
    const results = await getFaqsByProductId(product.id);
    if (results.data && results.data.product_faqs) {
      setfaqData((prev) => [...prev, ...results.data.product_faqs]);
    }
  };

  useEffect(() => {
    setfaqData([]);
    fetchfaqData();
  }, [product]);

  return (
    <div className={faqBg === true ? "section_bg" : ""}>
      <div className="section_padding">
        <div className="main_container">
          <div className="prod_faq">
            <div className="section_head">

              {product.faq_heading && (
                <h3 className={`primary_title ${sarabun}`}>{product.faq_heading}</h3>
              )}
              <div className="section_cta">
                <AskQuestion product={product} blockContent={blockContent} sarabun={sarabun}/>
              </div>
            </div>
            <AccordionTwoCol acc={prodFAQ} />
          </div>
        </div>
      </div>
    </div>
  );
}
