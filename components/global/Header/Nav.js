import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Search from './Search';
import { imageLoader } from '@/components/shared/imageLoader';
import Image from 'next/image';
import MainMegaMenu from './MainMegaMenu';
import ServicesMenu from './ServicesMenu';
import SupportMenu from './SupportMenu';

export default function Nav({ globalMagento, sideBar, setSideBar, customBlocksData }) {
  const navRef = useRef(null);
  const [megaMenuHeight, setMegaMenuHeight] = useState('0');
  const [menuId, setMenuId] = useState(null);
  const [prevMenuId, setPrevMenuId] = useState(null);

  const toggleMegaMenu = (menuId) => {
    setMenuId(menuId);
    if (menuId == prevMenuId) {
      setMegaMenuHeight(megaMenuHeight === '0' ? 'auto' : '0');
    } else {
      setMegaMenuHeight('auto');
    }
    setPrevMenuId(menuId);
  };

  const showMegaMenu = (menuId) => {
    /* setMenuId(menuId);
    setMegaMenuHeight('auto');
    setPrevMenuId(menuId); */
  };

  const hideMegaMenu = (menuId) => {
    /* setMenuId(menuId);
    setMegaMenuHeight('0');
    setPrevMenuId(menuId); */
  };

  const toggleSideBar = () => {
    setSideBar(sideBar === false ? true : false);
    setMegaMenuHeight('0');
  };

  useEffect(() => {
    const megaOverlayElement = document.createElement('div');
    megaOverlayElement.className = `pushbar_overlay`;

    try{
      document.body.appendChild(megaOverlayElement);
    }catch(e){}
    
    if (megaMenuHeight == 'auto') {
      megaOverlayElement.classList.add('opened');
    }
    return () => {
      try{
        document.body.removeChild(megaOverlayElement);
      }catch(e){}
    };
  }, [megaMenuHeight]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMegaMenuHeight('0');
      }
    }
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [])
  return (
    <>
      <nav className="navigation" ref={navRef}>
        <div className="menu_icon" onClick={toggleSideBar}>
          <span className="text">Menu</span>
          <button aria-label='Open Menu' data-pushbar-target="right">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>

          </button>
        </div>
        <aside
          data-pushbar-resp="right" data-pushbar-direction="right" className={sideBar ? "opened" : ''}
        >
          <div className="close_side_bar" onClick={toggleSideBar}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

          </div>
          <div className="resp_logo_search">
            <div className="side_bar_logo" onClick={toggleSideBar}>
              <Link href="/">
                <Image
                  loader={imageLoader}
                  src={`/images/webp/responsive_logo.webp`}
                  alt={`Fme Extensions`}
                  width={252}
                  height={75}
                  style={{ width: 'auto', height: 'auto' }}
                  priority={1}
                />
              </Link>
            </div>
            <Search />
          </div>
          <div className="nav">
            <ul className="nav_bar">
              {
                globalMagento !== null ?
                  globalMagento && globalMagento.children.map(({ id, include_in_menu, display_mode, name, children, url_path, products }) => {
                    if (include_in_menu) {
                      return (
                        <li className='nav_list' key={id} onMouseEnter={() => showMegaMenu(id)} onMouseLeave={() => hideMegaMenu(id)}>
                          <Link className='nav_item loading_action' href={`${url_path == '/support' ? '/support-center' : url_path}`} onClick={toggleSideBar}>{name}</Link>
                          {children.length > 0 && <div className="first_layer inline-block align-middle cursor-pointer" onClick={() => toggleMegaMenu(id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                            >
                              <path
                                d="M7.29297 10.416L12.5013 15.6243L17.7096 10.416"
                                stroke="black"
                                strokeWidth="1.5625"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>}
                          {display_mode === 'PRODUCTS_AND_PAGE' && <div className="first_layer inline-block align-middle cursor-pointer" onClick={() => toggleMegaMenu(id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                            >
                              <path
                                d="M7.29297 10.416L12.5013 15.6243L17.7096 10.416"
                                stroke="black"
                                strokeWidth="1.5625"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>}
                          {display_mode === 'PAGE' && <div className="first_layer inline-block align-middle cursor-pointer" onClick={() => toggleMegaMenu(id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="25"
                              viewBox="0 0 25 25"
                              fill="none"
                            >
                              <path
                                d="M7.29297 10.416L12.5013 15.6243L17.7096 10.416"
                                stroke="black"
                                strokeWidth="1.5625"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </div>}
                          <div className={`mega_menu`} style={{ height: menuId === id ? megaMenuHeight : 0 }}>
                            <div className="mega_menu_inner">
                              {display_mode === 'PRODUCTS' && children.length > 0 && menuId === id && <MainMegaMenu setMegaMenuHeight={setMegaMenuHeight} megaMenuHeight={megaMenuHeight} setSideBar={setSideBar} children={children} name={name} products={products} parent_url_path={url_path} customBlocksData={customBlocksData} />}
                              {display_mode === 'PRODUCTS_AND_PAGE' && menuId === id && <ServicesMenu setMegaMenuHeight={setMegaMenuHeight} megaMenuHeight={megaMenuHeight} setSideBar={setSideBar} globalMagento={globalMagento} customBlocksData={customBlocksData} />}
                              {display_mode === 'PAGE' && <SupportMenu setMegaMenuHeight={setMegaMenuHeight} megaMenuHeight={megaMenuHeight} setSideBar={setSideBar} globalMagento={globalMagento} customBlocksData={customBlocksData} />}
                            </div>
                          </div>
                        </li>
                      )
                    }
                  })
                  :
                  <></>
              }
            </ul>
          </div>
        </aside>
      </nav>
    </>
  );
}
