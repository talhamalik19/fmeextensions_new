import dlv from 'dlv';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router';
import { headerBlogSearch, headerSearchProduct } from '@/pages/api/search';

export default function Search({ isBlog, selectedStore }) {
  const searchRef = useRef(null)
  const [mediaUrl, setMediaUrl] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const router = useRouter();

  const handlePopup = () => {
    setShowPopup(false);
    setSearchResult('')
    setSearchValue('')
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setSearchValue(value);
    // Toggle showPopups based on whether the input value is not empty
    setShowPopup(value !== '');
    try {
      if (isBlog) {
          const searchResultResponse = await headerBlogSearch(`${value}`);
          if (searchResultResponse.data.blog.blogs_data.length) {
            setSearchResult({ items: searchResultResponse.data.blog.blogs_data });
            setMediaUrl(searchResultResponse.data.blog.blogs_media_url);
          } else {
            setSearchResult(null);
          }
      } else {
        const searchResultResponse = await headerSearchProduct(`search: "${value}"`);
        if (searchResultResponse.data.products.items.length) {
          setSearchResult(searchResultResponse.data.products);
        } else {
          setSearchResult(null);
        }
      }
    } catch (error) { }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setShowPopup(false);

      // Prevent the default form submission behavior
      event.preventDefault();

      // Define the target URL based on the condition
      let targetUrl;
      if (isBlog) {
        targetUrl = `${selectedStore != 'default' ? `/${selectedStore}/blog/search?q=${searchValue}` : `/blog/search?q=${searchValue}`}`;
      } else {
        targetUrl = `${selectedStore != 'default' ? `/${selectedStore}/searchresult?q=${searchValue}` : `/searchresult?q=${searchValue}`}`;
      }

      // Redirect to the target URL
      window.location.href = targetUrl;
    }
  };


  useEffect(() => {
    let handler = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };
    document.body.addEventListener("click", handler);

    return () => {
      document.body.removeEventListener("click", handler);
    };
  }, []);

  return (
    <>
      <div className="search" ref={searchRef}>
        <div className="search_field">
          <input className='search_item' type="search" name="" id="" value={searchValue} placeholder='What are you looking for ?' onChange={handleInputChange} onFocus={() => setShowPopup(searchValue !== '')} onKeyUpCapture={handleKeyPress} />
          <div className="resp_search">
            <svg className="feather feather-search" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="8" /><line x1="21" x2="16.65" y1="21" y2="16.65" /></svg>
          </div>
        </div>
        {showPopup && dlv(searchResult, 'items') &&<div className='search-suggestions'>
          <div className=''>
            {dlv(searchResult, 'items') && searchResult.items.map((item) => {

              return (
                <>
                  <Link onClick={handlePopup} className='loading_action flex gap-3 items-center mb-4 justify-start pb-4 border-b border-solid border-gray-300' key={`product-${item.id}`} href={`/${item.url_key || `/blog/${item.identifier}`}`}>
                    <img
                      className="loading_action max-w-auto w-[60px] m-0"
                      src={`${item.image.url || `${mediaUrl}${item.image}`}`}
                      alt={`Image for ${item.name || item.title}`}
                    />
                    <p className='loading_action item-name text-[#000] hover:text-[#DB4D2D]'>{item.name || item.title}</p>
                  </Link>
                </>
              )
            })}
          </div>
        </div>}
      </div>
    </>
  )
}
