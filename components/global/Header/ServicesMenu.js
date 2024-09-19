import Image from 'next/image';
import UseMediaQuery from '../UseMediaQuery';
import Link from 'next/link';
import dlv from 'dlv';
import { imageLoader } from '@/components/shared/imageLoader';
import styles from './ServicesMenu.module.css';

export default function ServicesMenu({ megaMenuHeight, setMegaMenuHeight, setSideBar, customBlocksData }) {
  let showMediaQueryBlock = UseMediaQuery('(min-width:1024px)');

  const toggleMegaMenu = () => {
    setMegaMenuHeight(megaMenuHeight === '0' ? 'auto' : '0');
    setSideBar(false)
  };

  return (
    <div className="services_megaMenu">
      <div className="services_menu_block">
        <div className="service_menu_prod flex flex-wrap lg:flex-nowrap gap-8">
          <div className='service_cms_block px-10 py-8 w-full lg:w-2/5 hidden lg:flex flex-col items-center justify-center'>
            <div className="image_block">
              <Image
                loader={imageLoader}
                src={`${dlv(customBlocksData, '1.cards.0.image.0.url')}`}
                alt={`${dlv(customBlocksData, '1.cards.0.image.0.alt')}`}
                width={355}
                height={200}
                style={{ maxWidth: '100%', height: 'auto', margin: 'auto' }}
                className='loading_action'
              />
            </div>
            <div className="service_cms_content text-center">
              <h2 className="text-xl md:text-2xl lg:text-2xl xl:text-4xl text-titleColor font-titleFont font-semibold lg:py-5 xl:py-7">{dlv(customBlocksData, '1.cards.0.heading')}</h2>
              <p className="text-base md:text-lg text-textColor font-textFont lg:mb-5 xl:mb-8">{dlv(customBlocksData, '1.cards.0.text')}</p>
              <Link href={`${dlv(customBlocksData, '1.cards.0.button.0.field_redirect')}`} className='primary_cta service_mega_cta' onClick={toggleMegaMenu}>{dlv(customBlocksData, '1.cards.0.button.0.field_text')}</Link>
            </div>
          </div>
          {showMediaQueryBlock ? <ul className="service_prod_col w-full lg:w-3/5">
            {dlv(customBlocksData, '1') &&
              dlv(customBlocksData, '1.links.0.link').map(
                (product, index) => {
                  return (
                    <>
                      <li className={`${styles['mobile-li']} service_item_${index} mega_service_list loading_action`} key={`ser=${index}`} onClick={toggleMegaMenu}>
                        <Link href={`${product.field_redirect}`} className="loading_action mega_service_link">

                          <Image
                            loader={imageLoader}
                            src={`${dlv(customBlocksData, `1.links.0.image.${index}.url`)}`}
                            alt={`${dlv(customBlocksData, `1.links.0.image.${index}.alt`)}`}
                            width={100}
                            height={42}
                            style={{ height: 'auto', margin: 'auto' }}
                            className='loading_action'
                            priority
                          />
                          <span className="name loading_action"> {`${dlv(product, 'field_text')}`} </span>
                          <p className='primary_text secondary_text loading_action'>{`${dlv(customBlocksData, `1.links.0.description.${index}.field_text`)}`}</p>
                        </Link>
                      </li>
                    </>
                  );
                }
              )
            }
          </ul>
            :
            <ul className="service_prod_col w-full lg:w-3/5">
              {dlv(customBlocksData, '1') &&
                dlv(customBlocksData, '1.links.0.link').map(
                  (product, index) => {
                    return (
                      <>
                        <li className={`${styles['desktop-li']} mega_service_list loading_action`} key={`ser=${index}`} onClick={toggleMegaMenu}>
                          <Link href={`${product.field_redirect}`} className="loading_action mega_service_link">
                            <span className="name loading_action"> {`${dlv(product, 'field_text')}`} </span>
                          </Link>
                        </li>
                      </>
                    );
                  }
                )
              }
            </ul>
          }
        </div>
        <div className="view_all_service gap-5 justify-center items-center lg:mt-5 xl:mt-7 hidden lg:flex">
          <p className="text-base md:text-lg text-textColor font-textFont">{dlv(customBlocksData, '1.text')}</p>
          <Link href={`${dlv(customBlocksData, '1.button.field_redirect')}`} className='primary_cta secondary_cta' onClick={toggleMegaMenu}>{dlv(customBlocksData, '1.button.field_text')}</Link>
        </div>
      </div>
    </div>
  );
}
