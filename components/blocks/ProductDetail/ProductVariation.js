import { useEffect, useState } from 'react';
import ProductOptions from './ProductOptions';
import dlv from 'dlv';
import ProductPrice from './ProductPrice';
import SectionCta from '@/components/global/SectionCta';
import ProductSupportInfo from './ProductSupportInfo';
import { addCartItem, getCartItems, removeCartItem } from '@/pages/api/cart';
import AddCartDialog from '@/components/global/AddCartDialog';
import LoadingAnimation from '@/components/shared/LoadingAnimation';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/cartSlice';
import { useRouter } from 'next/router';

export default function ProductVariation({
  product,
  include,
  currentPrice,
  blockContent,
  configuration_id,
  pageName,
  closeModal,
  setCartItems,
  update,
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [totalPriceOptions, setTotalPriceOptions] = useState(product.price.regularPrice.amount.value);
  const [totalPriceLinks, setTotalPriceLinks] = useState(0);
  const [selectedLinks, setSelectedLinks] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQty, setCurrentQty] = useState(1);
  const [cartState, setCartState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isUpdateCart, setIsUpdateCart] = useState(update || false);
  const [isLoading, setIsLoading] = useState(false);
  const [foundItem, setFoundItem] = useState(false);
  const [cartButton, setCartButton] = useState(false)

  const handleQtyMinus = () => {
    setCurrentQty(prevCount => Math.max(prevCount - 1, 1));
  }
  const handleQtyPlus = () => {
    setCurrentQty(prevCount => Math.min(prevCount + 1, 10));
  }

  const handleQuantity = () => {
  }

  const handleAddToCart = async (event) => {
    setSuccessMessage(null)
    let options = `[{}]`;
    let links = `[{}]`;
    
    product.options && product.options.map((option)=>{
      option.radio_option && option.radio_option.map((opt)=>{
        const option_type_id = opt.option_type_id;
        const selectedOptionsArray = Object.values(selectedOptions);
        selectedOptionsArray.map(item => {
          const selected_option_id = item.optionTypeId;
          if(option_type_id == selected_option_id){
            if(opt.title == 'Community'){
              /* product.downloadable_product_links && product.downloadable_product_links.map((link)=>{
                if(link.title.startsWith('CMT')){
                }
              }) */

              if(product.downloadable_product_links){
                links = `[${product.downloadable_product_links
                  .map((link) => {
                    if(!link.title.startsWith('ENT')){
                    return (`{ link_id: ${link.id} }`)
                    }
                  })
                  .join('')}]`;
              }
            }else if(opt.title == 'Enterprise'){
              if(product.downloadable_product_links){
                links = `[${product.downloadable_product_links
                  .map((link) => {
                    if(!link.title.startsWith('CMT')){
                    return (`{ link_id: ${link.id} }`)
                    }
                  })
                  .join('')}]`;
              }
            }
          }
      });
      })
    })
   
    /* if (selectedLinks) {
      links = `[${selectedLinks
        .map((link) => {
          return (`{ link_id: ${link} }`)
        })
        .join('')}]`;
    } */

    if (selectedOptions) {
      options = `[${Object.entries(selectedOptions)
        .map(([id, option]) => {
          if (Array.isArray(option) && option.length > 0) {
            const optionTypeIds = option.map(opt => dlv(opt, 'optionTypeId')).join(',');
            return `{ id: ${id}, value_string: "${optionTypeIds}" }`;
          } else {
            const valueString = dlv(option, 'optionTypeId');
            if (valueString !== undefined) {
              return `{ id: ${id}, value_string: "${valueString}" }`;
            }
          }
          return ''; // Return empty string for unmatched cases
        })
        .filter(Boolean) // Filter out empty strings
        .join('')}]`;


    }
    try{
      if (isUpdateCart) {
        setIsLoading(true)
        const remove = await removeCartItem(dlv(foundItem, 'id'));
        if (dlv(remove, 'data.removeItemFromCart')) {
          const add = await addCartItem(product.sku, currentQty, links, options)
          setCartButton(true)
          if (dlv(add, 'data.addDownloadableProductsToCart.cart')) {
            let quantity = dlv(add, 'data.addDownloadableProductsToCart.cart.items').reduce((total, item) => {
              return total + parseInt(item.quantity);
            }, 0);
            dispatch(cartActions.setItems(quantity));
            const items = dlv(add, 'data.addDownloadableProductsToCart.cart.items', []);
            const cartItem = items.find(item => dlv(item, 'product.sku') == dlv(product, 'sku'));
            setFoundItem(cartItem)
            setIsLoading(false)
            setSuccessMessage('Updated Successfully')
            if(router.asPath != '/cart'){
              setCartState(true)
            }
            if (setCartItems) {
              setCartItems(dlv(add, 'data.addDownloadableProductsToCart.cart'))
            }
          } else if (dlv(add, 'errors')) {
            setIsLoading(false)
            setErrorMessage(dlv(add, 'errors')[0].message)
          }
        } else { setIsLoading(false) }
      } else {

        if(router.asPath != '/cart'){
          setCartState(true)
          document.body.style.overflow = 'hidden';
        }
        
        const add = await addCartItem(product.sku, currentQty, links, options);
        setCartButton(true)
       if (dlv(add, 'data.addDownloadableProductsToCart.cart')) {
        let quantity = dlv(add, 'data.addDownloadableProductsToCart.cart.items').reduce((total, item) => {
          return total + parseInt(item.quantity);
        }, 0);
        if(router.asPath != '/cart'){
          
        }else{
          closeModal(false)
        }
        dispatch(cartActions.setItems(quantity));
          if (setCartItems) {
            setCartItems(dlv(add, 'data.addDownloadableProductsToCart.cart'))
          }
        } else if (dlv(add, 'errors')) {
          setErrorMessage(dlv(add, 'errors')[0].message)
          setCartState(false)
        }
      }
    }catch(e){}
  };

  const fetchCartData = async () => {
    try {
      const cart = await getCartItems();
      const items = dlv(cart, 'data.cart.items', []);
      const cartItem = items.find(item => dlv(item, 'product.sku') == dlv(product, 'sku') && dlv(item,'id') == configuration_id);
      setFoundItem(cartItem)
      if (cartItem) {
        setCurrentQty(dlv(cartItem, 'quantity'))
        setIsUpdateCart(update)
        let checkBoxOptions = {};
        let radioOptions = {};
        let downloadableLinks = [];

        const customizableOptions = dlv(cartItem, 'customizable_options', []);
        const links = dlv(cartItem, 'links', []);
        links.map((link) => {
          downloadableLinks.push(dlv(link, 'id'))
        })
        setSelectedLinks(downloadableLinks)
        customizableOptions.forEach((options) => {
          if (dlv(options, 'type') === 'checkbox') {
            if (!checkBoxOptions[dlv(options, 'id')]) {
              checkBoxOptions[dlv(options, 'id')] = [];
            }
            dlv(options, 'values').forEach((option) => {
              checkBoxOptions[dlv(options, 'id')].push({
                optionTypeId: parseInt(dlv(option, 'value')),
                price: dlv(option, 'price.value')
              });
            });
          }
          if (dlv(options, 'type') === 'radio') {
            dlv(options, 'values').forEach((option) => {
              radioOptions[dlv(options, 'id')] = {
                optionTypeId: parseInt(dlv(option, 'value'), 10),
                price: dlv(option, 'price.value')
              };
            });
          }
        });
        setSelectedOptions(
          { ...checkBoxOptions, ...radioOptions }
        )
      } else { setIsUpdateCart(false) }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  useEffect(() => {
    fetchCartData();
  }, [include, product])

  let totalPrice = totalPriceOptions;
  if(dlv(product, 'downloadable_product_links')){
    totalPrice+=totalPriceLinks;
  }

  return (
    <div className='product_variation'>
    {/* {dlv(product, 'downloadable_product_links') &&  <ProductDownloadLinks
        downloadableProducts={dlv(product, 'downloadable_product_links')}
        linksPurchasedSeparately={dlv(product, 'links_purchased_separately')}
        setTotalPriceLinks={setTotalPriceLinks}
        selectedLinks={selectedLinks}
        setSelectedLinks={setSelectedLinks}
        product={product}
      />} */}

      <div className="prod_edition both_editions">
      {include &&  <ProductOptions
          options={include}
          defaultPrice={currentPrice}
          setTotalPriceOptions={setTotalPriceOptions}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          product={product}
        />} 
      </div>
      <LoadingAnimation isLoading={isLoading} />
      <div className="prod_edition include top-no">
        <div className="price_Qty">
          <ProductPrice currentPrice={totalPrice} oldPrice={totalPrice} product={product} />
          <div className="prod_qty">
            <span className="primary_text">Qty:</span>
            <div className="qty_block">
              <button aria-label='Increase Quantity' className='qty_btn minus' onClick={handleQtyMinus}>
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="2" viewBox="0 0 15 2" fill="none">
                  <path d="M15 2H0V0H15V2Z" fill="#253D4E" />
                </svg>
              </button>
              <input aria-label='Quantity' type="text" name="qty" id="qty" value={currentQty} className='qty_field' onChange={handleQuantity} />
              <button aria-label='Decrease Quantity' className='qty_btn pluse' onClick={handleQtyPlus}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#253D4E" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
        {successMessage && <p className='text-green-500'>{successMessage}</p>}
        <div className="section_cta buy_now">
            {isUpdateCart ? <button onClick={handleAddToCart} className='primary_cta'>Update Cart</button> : <button onClick={handleAddToCart} className='primary_cta'>{dlv(blockContent,'links') && dlv(blockContent, 'links.0.button.4.field_text','')}</button>}
          <AddCartDialog setCartItems={setCartItems} closeModal={closeModal} product={product} setCartState={setCartState} cartState={cartState} cartButton={cartButton} />
          {blockContent && <SectionCta props={dlv(blockContent, 'links.0.button.5.field_text','')} url={`${dlv(blockContent, 'links.0.button.5.field_redirect','')}?module=${product.name}`} ctaClass="cta_link" />}
        </div>
      </div>

      {pageName === 'product_detail' ? <ProductSupportInfo blockContent={blockContent} /> : ''}
    </div>
  );
}
