import Link from "next/link";
import UseMediaQuery from "../UseMediaQuery";
import { useState } from "react";
import Image from "next/image";
import { imageLoader } from "@/components/shared/imageLoader";
import dlv from "dlv";

export default function MainMegaMenu({ megaMenuHeight, setMegaMenuHeight, setSideBar, children, name, products, parent_url_path, customBlocksData }) {
  let showMediaQueryBlock = UseMediaQuery('(min-width:1024px)');
  const [subMenuHeight, setSubMenuHeight] = useState('0');
  const [menuId, setMenuId] = useState(null);
  const [prevMenuId, setPrevMenuId] = useState(null);

  const toggleMegaMenu = () => {
    setMegaMenuHeight(megaMenuHeight === '0' ? 'auto' : '0');
    setSideBar(false)
  };

  const toggleSubMenu = (menuId) => {
    setMenuId(menuId);
    if (menuId == prevMenuId) {
      setSubMenuHeight(subMenuHeight === '0' ? 'auto' : '0');
    } else {
      setSubMenuHeight('auto');
    }
    setPrevMenuId(menuId);
  };
  return (
    <>
      <div className="mega_side_bar">
        <div className="mega_feat_prod">
          <h2 className="title">{dlv(customBlocksData, '1.featured_text')}</h2>
          <ul className="mega_ft_col">
            {
              products && products.items.length > 0 && products.items.map(({ id, name, thumbnail, url_key }, index) => {
                if (index < 4) {
                  return (
                    <li className="mega_ft_list" onClick={toggleMegaMenu} key={id}>
                      <Link href={`/${url_key}`} className="mega_ft_link loading_action btn-cart" onClick={() => { }}>
                        <Image
                          loader={imageLoader}
                          src={`${thumbnail.url}`}
                          alt={`${thumbnail.label}`}
                          width={50}
                          height={42}
                          style={{ height: 'auto' }}
                          className='loading_action'
                        />
                        <span className="name loading_action"> {name} </span>
                      </Link>
                    </li>
                  )
                }
              })
            }
            <li><Link className='primary_cta cta_link loading_action' href={`/${dlv(customBlocksData, '1.view_all_best_sellers.field_redirect')}`} onClick={toggleMegaMenu}>{dlv(customBlocksData, '1.view_all_best_sellers.field_text')}</Link></li>
          </ul>
        </div>
      </div>
      <ul className="mega_menu_block">
        {
          children.map(({ id, include_in_menu, name, url_path, products, product_count }) => {
            if (include_in_menu) {
              return (
                <li className="mega_menu_item">
                  <div className="catg_row loading_action">
                    <Link href={`/${url_path}`} className="mega_menu_title loading_action" onClick={toggleMegaMenu}>
                      {name}
                      <span className="mega_count loading_action">
                        ({product_count})
                      </span>
                    </Link>
                    <div className="open_inner_nav" onClick={() => toggleSubMenu(id)}></div>
                  </div>
                  <ul className="mega_list" style={{ height: menuId === id ? subMenuHeight : showMediaQueryBlock ? 'auto' : 0 }}>
                    {
                      products && products.items.length > 0 && products.items.map(({ id, name, url_key }) => {
                        return (
                          <li className="mega_item" onClick={toggleMegaMenu} key={id}>
                            <Link href={`/${url_key}`} className="mega_item_link loading_action" onClick={toggleMegaMenu}>{name}</Link>
                          </li>
                        )
                      })
                    }

                  </ul>
                </li>
              )
            }
          })
        }
      </ul>
    </>
  );
}
