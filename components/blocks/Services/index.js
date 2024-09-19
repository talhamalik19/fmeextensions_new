import MagentoMigration from "../MagentoMigration";
import HeroInfo from "../HeroInfo";
import { useEffect, useState } from "react";
import FeaturedService from "../MagentoServicesListing/FeaturedService";
import ServiceListing from "../MagentoServicesListing/ServiceListing";
import { getProductsByFilter } from "@/pages/api/product";
import { customBlocks } from "@/pages/api/page";

export default function Services({ category_id, sarabun }) {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(100);
  const [filter, setFilter] = useState(category_id);
  const [blockContent, setBlockContent] = useState([]);

  //Fetch Products
  const fetchProducts = async () => {
    const filterQuery = `filter: {is_service: {eq: true}}`;
    const servicesProducts = await getProductsByFilter(
      filterQuery,
      pageSize,
      page
    );
    const customBlocksData = await customBlocks("product-services-page");
    try {
      setProducts((prev) => [...prev, ...servicesProducts.data.products.items]);
      setBlockContent(JSON.parse(customBlocksData.data.blocks_data)[0]);
    } catch (e) {
    }
  };

  useEffect(() => {
    setProducts([]);
    fetchProducts();
  }, [page, filter, pageSize]);

  return (
    <>
      {products.map((product) => {
        switch (product.services_layout) {
          case "15":
            return (
              <MagentoMigration
                key={product.id}
                magentoMigration={product}
                blockContent={blockContent}
                sarabun={sarabun}
              />
            );
          case "16":
            return (
              <div key={product.id} className="services_container">
                <FeaturedService
                  product={product}
                  blockContent={blockContent}
                  sarabun={sarabun}
                />
              </div>
            );
        }
      })}
      <div className="services_container">
        <ServiceListing serviceList={products} blockContent={blockContent} sarabun={sarabun}/>
      </div>

      <HeroInfo blockContent={blockContent} sarabun={sarabun}/>
    </>
  );
}
