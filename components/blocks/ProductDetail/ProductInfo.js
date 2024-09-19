

import ProdDtlReview from './ProdDtlReview';
import ProductVariation from './ProductVariation';
import ProductDescription from './ProductDescription';
import dlv from 'dlv';
import Image from 'next/image';
import { imageLoader } from '@/components/shared/imageLoader';

export default function ProductInfo({ product, productBasicInfo, blockContent, user, jwt, pageName, closeModal, isDescriptionEnabled, setCartItems, update, configuration_id, sarabun }) {
  // Product Detail Content

  // Product review and current version
  const productName = dlv(product, 'name');
  const numberOfReview = dlv(product, 'review_count');
  const currentVersion = dlv(product, 'version');

  // Product type and name
  const prodName = dlv(product, 'name');
  const productType = dlv(product, 'sub_title');

  // Product Variation objects

  const edition = [
    { id: 1, edition: 'Community' },
    { id: 2, edition: 'Enterprise', extraCharges: '+$200.00' },
  ]
  const include = dlv(product, 'options');

  // Product Price
  const currentPrice = dlv(product, 'price.regularPrice.amount.value');
  const oldPrice = dlv(product, 'price.regularPrice.amount.value');

  // Product Description

  let keyFeatures = null;
  try {
    keyFeatures = dlv(product, 'm1_key_features').split('\r\n');
  } catch (e) { }

  const description = {
    id: 1, desc: dlv(product, 'short_description.html'),
    list: keyFeatures
  }

  const magento_version = dlv(product, 'sub_title') == 'for Magento 2' ? 'M1' : 'M2';

  return (
    <div className="prod_dtl_info">
      <div className="prod_title">
        <div className="left_col">
          <Image
          loader={imageLoader}
            src={dlv(product, 'thumbnail.url')}
            alt={`${dlv(product, 'thumbnail.label')}`}
            width={85}
            height={85}
            style={{ height: 'auto' }}
          />
        </div>
        <div className="right_col">
          <h1 className={`${sarabun} primary_title`}>
            {`${productBasicInfo && productBasicInfo.name}`}

            {productType &&
              <span className="primary_text">{` ${productType}`}</span>
            }
          </h1>
          {currentVersion && <div className="current_version desk">{currentVersion}</div>}
          {/* <div className="prod_type">
            {blockContent.links &&
              dlv(product, 'parallel_product', '') && <SectionCta props={dlv(blockContent.links[0].button[7], 'field_text', '').replace('M1', magento_version)} url={dlv(product, 'parallel_product', '').replace('https://www.fmeextensions.com', '').replace('.html', '')} ctaClass="cta_link" />
            }
          </div> */}
        </div>
      </div>
      {product &&
        <ProdDtlReview productName={productName} numberOfReview={numberOfReview} currentVersion={currentVersion} blockContent={blockContent} product={product} magento_version={magento_version}/>
      }

      {product &&
        <ProductVariation setCartItems={setCartItems} closeModal={closeModal} jwt={jwt} user={user} product={product} include={include} currentPrice={currentPrice} oldPrice={oldPrice} blockContent={blockContent} pageName={pageName} update={update} configuration_id={configuration_id} />
      }
      {isDescriptionEnabled && <ProductDescription prodDesc={description} blockContent={blockContent} product={product} sarabun={sarabun}/>}


    </div>
  )
}
