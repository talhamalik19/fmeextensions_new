import { CurrencyCodeToSymbol } from "@/components/shared/CurrencyCodeToSymbol";
import dlv from "dlv";
import { useEffect } from "react";

const ProductDownloadLinks = ({
  downloadableProducts,
  linksPurchasedSeparately,
  setTotalPriceLinks,
  selectedLinks,
  setSelectedLinks,
  product
}) => {

  useEffect(() => {
    if (linksPurchasedSeparately) {
      setSelectedLinks([downloadableProducts[0].id]);
      setTotalPriceLinks(downloadableProducts[0].price);
    } else {
      const allLinkIds = downloadableProducts.map((link) => link.id);
      setSelectedLinks(allLinkIds);
    }
  }, [downloadableProducts, linksPurchasedSeparately, setTotalPriceLinks]);

  const handleLinkChange = (linkId, price, checked) => {
    if (checked) {
      setSelectedLinks((prevSelectedLinks) => [...prevSelectedLinks, linkId]);
      setTotalPriceLinks((prevTotal) => prevTotal + price);
    } else {
      setSelectedLinks((prevSelectedLinks) => prevSelectedLinks.filter((id) => id !== linkId));
      setTotalPriceLinks((prevTotal) => prevTotal - price);
    }
  };

  return (
    linksPurchasedSeparately === 1 && (
      <div>
        <div className="title p-4">{dlv(product, 'links_title')}</div>
        <div className='p-6 prod_edition include download'>
          {downloadableProducts.map((link) => (
            <div key={link.id} className='radio_block'>
              <input
                type="checkbox"
                className='radio'
                id={`link_${link.id}`}
                value={link.id}
                checked={selectedLinks.includes(link.id)}
                onChange={(e) => handleLinkChange(link.id, link.price, e.target.checked)}
              />
              <label htmlFor={`link_${link.id}`}><span className="">{link.title} <CurrencyCodeToSymbol value={link.price} currency={dlv(product,'price.regularPrice.amount.currency')} /></span></label>
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default ProductDownloadLinks;
