import dynamic from "next/dynamic";
import dlv from "dlv";
import { useEffect, useState } from 'react';
import Card from "@/components/shared/Card";
import ProductCardPlaceholder from "@/components/shared/ProductCardPlaceholder";
import { customBlocks } from "@/pages/api/page";
import { getProductsByFilter } from "@/pages/api/product";
import { extractTextFromPTagsH1TagsAndButtons, parseHtml } from "@/utils/parseHtml";

const HighlightedProduct = dynamic(() => import("../HighlightedProduct"), {
  ssr: true,
});
const CatFilter = dynamic(() => import("@/components/blocks/ProductFilter/CatFilter"), {
  ssr: true,
});

const ProductListing = ({ globalMagento, pageName, heading, button, button1, button2, slug, category_id, bestSellerProducts, footer, pageData, MobileDevice, sarabun }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [filter, setFilter] = useState(category_id);
  const [sort, setSort] = useState('');
  const [blockContent, setBlockContent] = useState([]);
  const [loading, setLoading] = useState(0)
  let pDescription = null;

  try {
    const parsedHtml = parseHtml(dlv(pageData, 'description'));
    const { pTexts } = extractTextFromPTagsH1TagsAndButtons(parsedHtml);
    pDescription = pTexts;
  } catch (e) { }

  //Fetch Products
  const fetchProducts = async () => {
    const filterQuery = `filter: {category_id: {eq: "${filter || 36}"}}`;
    const results = await getProductsByFilter(filterQuery, pageSize, page, sort);
    if (dlv(results, 'data.products')) {
      setProducts((prev) => [...prev, ...results.data.products.items]);
    }
    setLoading(dlv(results, 'data.products.total_count'))

  };

  //Fetch block
  const fetchBlockContent = async () => {
    const customBlocksData = await customBlocks('blocks-category-page');
    try {
      setBlockContent(JSON.parse(customBlocksData.data.blocks_data)[0]);
    } catch (e) { }
  };
  /**
   * useEffect to trigger the `fetchProducts` function whenever `page` updates
   */
  useEffect(() => {
    setProducts([]);
    setPage(1); // Reset the page to 1 when the filter changes
    setFilter(category_id)
  }, [filter, category_id, sort]);

  useEffect(() => {
    fetchProducts();
  }, [page, filter, pageSize, sort]);

  useEffect(() => {
    fetchBlockContent();
  }, [pageName]);

  let filteredCategories = null
  if (typeof (slug) !== 'undefined') {
    filteredCategories = globalMagento.children
      .filter((categories) => categories.url_path === slug[0])
      .map((categories) => categories.children)
      .filter((children) => children !== undefined && children !== null && children.length > 0)
      .reduce((acc, val) => acc.concat(val), []);
  }

  const numberOfPage = Math.ceil(products.length / pageSize);

  const handlePageSizeChange = (event) => {
    const selectedValue = event.target.value;
    setPageSize(selectedValue);
  };

  const handleSorting = (event) => {
    const selectedValue = event.target.value;
    setSort(selectedValue);
  };

  // Open Filter State

  const [openFilter, setOpenFilter] = useState(false);

  const openFilterDialog = () => {
    setOpenFilter(!openFilter);
  }
  return (
    <>
      {
        pageName === 'home' ?
          <div className="section_bg">
            <HighlightedProduct isHome={true} title={heading} pageSize={7} bestSellerProducts={bestSellerProducts} footer={footer} sarabun={sarabun}/>
          </div>
          :
          !MobileDevice && <>
            <div className="main_container">
              <div className="filter_main">
                <div className='filter_icon' onClick={openFilterDialog}>Filter <span className="filter_img"></span></div>
                <div className={openFilter ? 'product_filter active' : 'product_filter'}>
                  <div className="filter_option">
                    <div className='selection'>
                      <label htmlFor="showing">Showing</label>
                      <select
                        name=""
                        id="showing"
                        className='showing_opt w-full mt-2 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                        defaultValue="15"
                        onChange={handlePageSizeChange}
                      >
                        <option value="6">6</option>
                        <option value="15">15</option>
                        <option value="30">30</option>
                        <option value="50">50</option>
                      </select>
                    </div>

                    <div className="selection">
                      <select aria-label="Filter" name="Filter" id="filter" className='w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg' defaultValue="" onChange={handleSorting}>
                        <option value="sort: { name: ASC }">Product Name</option>
                        <option value="sort: { price: ASC }">Price</option>
                        <option value="">Relevance</option>
                      </select>
                    </div>
                  </div>
                  <CatFilter filteredCategories={filteredCategories || null} setFilter={setFilter} filter={filter} />
                </div>
              </div>

            </div>

            <div className="section_padding">
              <div className="main_container">
                <div className="prod_listing lst_pg_pd grid_4">
                  {products.length > 0 ? products.map((item, index) => {
                    if (item.type !== 4) {
                      return (<Card
                        key={index}
                        product={item}
                        buyNowButton={dlv(blockContent, 'button')}
                        isLast={index === products.length - 1}
                        newLimit={() => setPage(page + 1)}
                        pageName={pageName}
                        sarabun={sarabun}
                      />
                      )
                    }
                  })
                    :
                    <ProductCardPlaceholder />
                  }
                </div>
                {
                  loading > pageSize ?
                    <div class="flexbox" style={{paddingTop:'40px'}}>
                      <div>
                        <div class="bt-spinner"></div>
                      </div>
                    </div>
                    : ''
                }
                {/* 
                {products.length > 0 && <PaginationNav totalPage={numberOfPage} page={page} setPage={setPage} />} */}

                <div className="pd_lst_cnt">
                  <p className="primary_text">{dlv(pDescription, '1')}</p>
                </div>
              </div>
            </div>
          </>
      }
    </>
  )
}

export default ProductListing;