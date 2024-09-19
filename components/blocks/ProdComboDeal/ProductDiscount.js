import ProdComboBadge from './ProdComboBadge'
import dlv from "dlv";
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { calculatePercentage } from '@/components/shared/calculatePercentage';
import { imageLoader } from '@/components/shared/imageLoader';
import { CurrencyCodeToSymbol } from '@/components/shared/CurrencyCodeToSymbol';
import { getCartItems } from '@/pages/api/cart';
import { getCookie } from 'cookies-next';
import dynamic from 'next/dynamic';
const ProductComboDialog = dynamic(() => import('./ProductComboDialog'));

export default function ProductDiscount({ product, closeModal, globalMagento, sarabun }) {
    const [currencySymbol, setCurrencySymbol] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(product);
    const [popup, showpopup] = useState(false);
    const [cartFromCartProvider, setCartFromCartProvider] = useState([]);
    const [selectedComboItems, setSelectedComboItems] = useState([]);
    const [totalWithoutOptions, setTotalWithoutOptions] = useState(0);
    const [discountValue, setDiscountValue] = useState(0);
    const upsellProducts = product?.upsell_products || [];
    const [rate, setRate] = useState(0)
    // function checkExchangeRates() {
    //   try {
    //     const parsedRates = product?.currency?.exchange_rates;
    //     const exchangeRate = parsedRates.find(rate => rate.currency_to == (getCookie('currency_code_fma') || 'USD'));
    //       setRate(exchangeRate.rate)
    //   } catch (e) {
    //   }
    // }

    const fetchCartItems = async () => {
        const response = await getCartItems();
        setCartFromCartProvider(response?.data);

        let updatedUpsellProducts = [];

        response?.data?.cart?.items?.forEach((item) => {
            const upsellProduct = dlv(currentProduct, 'upsell_products', []).find(p => p.sku === item?.product?.sku);
            if (upsellProduct) {
                updatedUpsellProducts.push(upsellProduct);
            }
        });

        if (updatedUpsellProducts?.length) {
            updatedUpsellProducts?.forEach((usp) => {
                const specialPrice = parseFloat(dlv(usp, 'special_price'));
                const regularPrice = parseFloat(dlv(usp, 'price.regularPrice.amount.value'));
                const newBasePrice = specialPrice || regularPrice;
                setTotalWithoutOptions((prevPrice) => prevPrice + newBasePrice);
            });
            setCurrentProduct(prevProduct => ({
                ...prevProduct,
                upsell_products: updatedUpsellProducts
            }));
        } else {
            // Show all product prices when there are no matching items in the cart
            const mainProductPrice = parseFloat(dlv(product, 'special_price')) || parseFloat(dlv(product, 'price.regularPrice.amount.value'));
            let totalPrice = mainProductPrice;
            upsellProducts.forEach((usp) => {
                const specialPrice = parseFloat(dlv(usp, 'special_price'));
                const regularPrice = parseFloat(dlv(usp, 'price.regularPrice.amount.value'));
                totalPrice += specialPrice || regularPrice;
            });
            setTotalWithoutOptions(totalPrice);
        }
    };

    useEffect(() => {
        fetchCartItems();
        const specialPrice = parseFloat(dlv(product, 'special_price'));
        const regularPrice = parseFloat(dlv(product, 'price.regularPrice.amount.value'));
        const newBasePrice = specialPrice || regularPrice;
        setTotalWithoutOptions(newBasePrice);
        const symbol = getCookie('symbol_currency') || '';
        setCurrencySymbol(symbol);
    }, [product]);

    useEffect(() => {
        const initialSelectedComboItems = currentProduct?.upsell_products?.map(usp => usp?.id) || [];
        setSelectedComboItems(initialSelectedComboItems);
    }, [currentProduct]);

    useEffect(() => {
        //Percentage Discount
        setDiscountValue((dlv(product, 'combo_discount_value')/100)*totalWithoutOptions);

        //Fixed Discount
        /* const dv = parseInt(dlv(currentProduct, 'combo_discount_value')) * (currentProduct?.upsell_products?.length + 1);
        setDiscountValue(dv); */
    }, [totalWithoutOptions]);

    const handleComboDiscount = (id, value, event) => {
        const isChecked = event.target.checked;
        const price = parseFloat(value);

        setSelectedComboItems(prevState => {
            if (isChecked) {
                // Add the id to the state if checked
                return [...prevState, id];
            } else {
                // Remove the id from the state if unchecked
                return prevState.filter(itemId => itemId !== id);
            }
        });

        if (isChecked) {
            setTotalWithoutOptions(prevPrice => prevPrice + price);
        } else {
            setTotalWithoutOptions(prevPrice => prevPrice - price);
        }

        let updatedUpsellProducts;
        if (isChecked) {
            updatedUpsellProducts = [...dlv(currentProduct, 'upsell_products', []), dlv(product, 'upsell_products').find(p => p.id === id)];
        } else {
            updatedUpsellProducts = dlv(currentProduct, 'upsell_products', []).filter(p => p.id !== id);
        }

        setCurrentProduct(prevProduct => ({
            ...prevProduct,
            upsell_products: updatedUpsellProducts
        }));
    };

    const close_dialog = () => { showpopup(false); document.body.style.overflow = 'auto'; }

    const handleAddToCart = async (event) => {
        showpopup(true);
        document.body.style.overflow = 'hidden';
    }
    console.log(product)
    return (
        <>
            <div className="prod_combo_card">
                <div className="combo_prod_container current_prod">
                    <div className="combo_prod_block ">
                        <div className="inner">
                            <div className="image_block">
                                <Image
                                    loader={imageLoader}
                                    src={`${dlv(product, 'thumbnail.url')}`}
                                    alt={`${dlv(product, 'thumbnail.label')}`}
                                    width={290}
                                    height={241}
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                                {dlv(product,'combo_discount_value') && <ProdComboBadge discount={`${dlv(product,'combo_discount_value')}%`} />}</div>
                            <div className="prod_combo_info">
                                {product && <h2 className={`${sarabun} combo_prod_title`}>{product.name}</h2>}
                                {product && <p className="combo_prod_price"><CurrencyCodeToSymbol value={dlv(product, 'price.regularPrice.amount.value')} currency={dlv(product, 'price.regularPrice.amount.currency')}/></p>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="combo_prod_container combo_prod">
                    {
                        dlv(product, 'upsell_products') && dlv(product, 'upsell_products').map((comboItem) =>
                            <div className="custom_check combo_prod_block" key={`combo-prod-block-${comboItem.id}`}>
                                <input
                                    type="checkbox"
                                    name=""
                                    id={comboItem.name}
                                    value={0} // You don't need this anymore
                                    className='check'
                                    checked={selectedComboItems.includes(comboItem.id)}
                                    onChange={(event) =>
                                        handleComboDiscount(
                                            dlv(comboItem, 'id'),
                                            dlv(comboItem, 'price.regularPrice.amount.value'),
                                            event
                                        )
                                    }
                                />
                                <label htmlFor={comboItem.name}>
                                    <div className="" key={comboItem.id}>
                                        <div className="inner">

                                            <div className="image_block">
                                                <Image
                                                    loader={imageLoader}
                                                    src={`${dlv(comboItem, 'thumbnail.url')}`}
                                                    alt={`${dlv(comboItem, 'image.label')}`}
                                                    width={290}
                                                    height={241}
                                                    style={{ width: 'auto', height: 'auto' }}
                                                />
                                                {dlv(product,'combo_discount_value') && <ProdComboBadge discount={`${dlv(product,'combo_discount_value')}%`} />}
                                            </div>
                                            <div className="prod_combo_info">
                                                {product && <h2 className={`${sarabun} combo_prod_title`}>{comboItem.name}</h2>}
                                                {comboItem && <p className="combo_prod_price"><CurrencyCodeToSymbol value={dlv(comboItem, 'price.regularPrice.amount.value')} currency={dlv(comboItem, 'price.regularPrice.amount.currency')}/></p>}
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="combo_total">
                <div className="combo_price">
                    <div className="combo_price_inner">
                    {dlv(product, 'combo_discount_value') && currentProduct?.upsell_products?.length > 0 && <del className="actual_price">{`${currencySymbol}${totalWithoutOptions.toFixed(2)}`}</del>}
                    <span className="total_price">
                            {currentProduct?.upsell_products?.length > 0 && `${currencySymbol}${((totalWithoutOptions.toFixed(2)) - discountValue ).toFixed(2)}`}
                            {currentProduct?.upsell_products?.length <= 0 && `${currencySymbol}${((totalWithoutOptions.toFixed(2)))}`}
                        </span>                    </div>
                </div>
                <button onClick={handleAddToCart} className='primary_cta'>Add To Cart</button>
            </div>
            {popup && <ProductComboDialog
                    product={currentProduct} // Pass the updated product object
                    globalMagento={{ ...globalMagento, currencySymbol: currencySymbol }}
                    closeModal={closeModal}
                    mainProduct={product}
                    cartFromCartProvider={cartFromCartProvider}
                    close_dialog={close_dialog}
                    popup={popup}
                    sarabun={sarabun}
                />}
        </>
    )
}
