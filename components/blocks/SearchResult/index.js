import { useEffect, useState } from "react";
import SearchResultBar from "./SearchResultBar";
import CatFilter from "../ProductFilter/CatFilter";
import Card from "@/components/shared/Card";
import dlv from "dlv";
import ProductCardPlaceholder from "@/components/shared/ProductCardPlaceholder";
import { searchProduct } from "@/pages/api/search";

export default function SearchResult({ query, globalMagento }) {
  const [searchResult, setSearchResult] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState('');
  const [blockContent, setBlockContent] = useState([]);
  const [searchStatus, setSearchStatus] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchProducts = async () => {
    try {
      let filterQuery = null;
      if (filter) {
        if (filter == 0) {
          filterQuery = `search: "${query}"`;
        } else {
          filterQuery = `filter: {category_id: {eq: "${filter}"}}
        pageSize: ${pageSize}
        currentPage: ${page}
        ${sort}
        search: "${query}"
        `;
        }

      } else {
        filterQuery = `search: "${query}"`;
      }
      const searchResultResponse = await searchProduct(filterQuery);
      setBlockContent(JSON.parse(searchResultResponse.data.blocks_data)[0]);
      if (searchResultResponse.data.products.items.length) {
        setSearchStatus(null)
        setSearchResult(searchResultResponse.data.products)
      } else {
        setSearchStatus('Not Found')
        setSearchResult(null)
      }
    } catch (error) { }
  }

  useEffect(() => {
    fetchProducts();
  }, [query, page, filter, pageSize, sort]);

  const searchFor = {
    title: query,
  };
  const handlePageSizeChange = (event) => {
    const selectedValue = event.target.value;
    setPageSize(selectedValue);
  };

  const handleSorting = (event) => {
    const selectedValue = event.target.value;
    setSort(selectedValue);
  };

  useEffect(() => {
    if (dlv(searchResult, 'items')) {
      const addedCategoryIds = new Set(categories.map(cat => cat.id));

      if (!addedCategoryIds.has(0)) {
        setCategories(prevCategories => [{
          "id": 0,
          "name": "All",
          "url_key": "all"
        }, ...prevCategories]);
      }
      dlv(searchResult, 'items').forEach(item => {
        dlv(item, 'categories').forEach(cat1 => {
          if (!addedCategoryIds.has(cat1.id)) {
            addedCategoryIds.add(cat1.id);
            setCategories(prevCategories => [...prevCategories, {"id": cat1.id, "name": cat1.name, "url_key":cat1.url_key, "sub_title":item.sub_title}]);
          }
        });
      });
    }
  }, [searchResult]);

  const pageName = dlv(blockContent, 'pageName', '');
  return (
    <div className="searchresult_wrapper">
      <SearchResultBar pageName={pageName} searchFor={searchFor} />
      <div className="main_container">
        <div className="section_padding">
        {searchStatus && <p style={{textAlign: 'center'}}>{dlv(blockContent, 'warning')}</p>}
          <div className="product_filter">
            {!searchStatus && <div className="filter_option">
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
                <select name="" id="" className='w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg' defaultValue="" onChange={handleSorting}>
                  <option value="sort: { name: ASC }">Product Name</option>
                  <option value="sort: { price: ASC }">Price</option>
                  <option value="">Relevance</option>
                </select>
              </div>
            </div>}
            <CatFilter filteredCategories={categories || null} setFilter={setFilter} filter={filter} isSearch={true} />
          </div>
        </div>
        <div className="home_prod_lst prod_listing grid_4">
          {searchResult ?
            searchResult.items.map((item, index) => {
              if (item.type !== 4) {
                return (
                  <Card
                    key={index}
                    product={item}
                    buyNowButton={dlv(blockContent, 'button')}
                    isLast={index === searchResult.length - 1}
                    newLimit={() => setPage(page)}
                  />)
              }
            })
            :
            !searchStatus && <ProductCardPlaceholder />
          }
        </div>
      </div>
    </div>
  );
}
