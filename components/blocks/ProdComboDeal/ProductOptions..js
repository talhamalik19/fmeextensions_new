import React, { useState, useEffect } from 'react';
import dlv from 'dlv';
import Link from 'next/link';
import { addCartItem, getCartItems, removeCartItem } from '@/pages/api/cart';
import AddCartDialog from '@/components/global/AddCartDialog';
import { useDispatch } from 'react-redux';
import { cartActions } from '@/store/cartSlice';

export default function ProductOptions({ product, mainProduct, globalMagento, closeModal, cartFromCartProvider, sarabun }) {
    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedUpsellOptions, setSelectedUpsellOptions] = useState({});
    const [isUpdateAble, setIsUpdateAble] = useState(false);
    const [foundItem, setFoundItem] = useState(false);
    const [foundUpsellItems, setFoundUpsellItems] = useState(false);
    const [cartState, setCartState] = useState(false);
    const options = product?.options || [];
    const upsellProducts = product?.upsell_products || [];
    const [basePrice, setBasePrice] = useState(0);
    const [finalPrice, setFinalPrice] = useState(0);
    const [currentQty, setCurrentQty] = useState(1);
    const [successMessage, setSuccessMessage] = useState(null);
    const [upsellPrices, setUpsellPrices] = useState({});
    const [discountValue, setDiscountValue] = useState(0);
    /* const discount_value = parseInt(dlv(product, 'combo_discount_value')) * (product?.upsell_products?.length + 1); */
    const dispatch = useDispatch();

    const parsedRates = mainProduct?.exchange_rates;
    const exchangeRate = parsedRates.find(rate => rate.currency_to == mainProduct?.price?.regularPrice?.amount?.currency);
    const rate = exchangeRate?.rate || 1;

    useEffect(() => {
        //Percentage Discount
        setDiscountValue((dlv(mainProduct, 'combo_discount_value')/100)*finalPrice);

        //Fixed Discount
        /* const dv = parseInt(dlv(currentProduct, 'combo_discount_value')) * (currentProduct?.upsell_products?.length + 1);
        setDiscountValue(dv); */
    }, [finalPrice]);

    useEffect(() => {
        const specialPrice = parseFloat(dlv(product, 'special_price'));
        const regularPrice = parseFloat(dlv(product, 'price.regularPrice.amount.value'));
        const newBasePrice = specialPrice || regularPrice;
        setBasePrice(newBasePrice);
        setFinalPrice(newBasePrice);
        setUpsellPrices(upsellProducts.reduce((acc, upsell) => {
            const upsellSpecialPrice = parseFloat(dlv(upsell, 'special_price'));
            const upsellRegularPrice = parseFloat(dlv(upsell, 'price.regularPrice.amount.value'));
            const upsellBasePrice = upsellSpecialPrice || upsellRegularPrice;
            acc[upsell.id] = { basePrice: upsellBasePrice, finalPrice: upsellBasePrice };
            return acc;
        }, {}));
    }, [product]);

    useEffect(() => {
        const defaultSelectedOptions = product?.options?.reduce((acc, option) => {
            option?.radio_option?.forEach(value => {
                if (value?.title === 'Community') {
                    setFinalPrice((prevPrice) => prevPrice + value.price);
                    acc[value.option_type_id] = {
                        optionId: option.option_id,
                        optionTypeId: parseInt(value.option_type_id, 10),
                        price: value.price*rate,
                        priceType: 'FIXED',
                        title: value.title
                    };
                }
            });
            return acc;
        }, {});

        setSelectedOptions(defaultSelectedOptions);

        const defaultUpsellSelectedOptions = upsellProducts.reduce((acc, upsell) => {
            const upsellOptions = upsell?.options?.reduce((upsellAcc, option) => {
                option?.radio_option?.forEach(value => {
                    if (value?.title === 'Community') {
                        if (!acc[upsell.id]) {
                            acc[upsell.id] = { finalPrice: upsellPrices[upsell.id]?.basePrice || 0, options: {} };
                        }
                        acc[upsell.id].finalPrice += value.price;
                        upsellAcc[value.option_type_id] = {
                            optionId: option.option_id,
                            optionTypeId: parseInt(value.option_type_id, 10),
                            price: value.price*rate,
                            priceType: 'FIXED',
                            title: value.title
                        };
                    }
                });
                return upsellAcc;
            }, {});
            acc[upsell.id] = { ...acc[upsell.id], ...upsellOptions };
            return acc;
        }, {});

        setSelectedUpsellOptions(defaultUpsellSelectedOptions);

        const upsellItems = [];
        const upsellOptions = defaultUpsellSelectedOptions;

        cartFromCartProvider?.cart?.items?.forEach((item) => {
            // Process upsell products
            mainProduct?.upsell_products?.forEach((upsellProduct) => {
                if (upsellProduct?.sku === item?.product?.sku) {
                    const preSelectedUpsellOptions = item?.customizable_options?.reduce((acc, option) => {
                        option.values.forEach(value => {
                            setFinalPrice(prevPrice => prevPrice + value.price.value);
                            acc[value.value] = {
                                optionId: option.id,
                                optionTypeId: parseInt(value.value, 10),
                                price: value.price.value*rate,
                                priceType: 'FIXED',
                                title: value.label
                            };
                        });
                        return acc;
                    }, {});

                    upsellItems.push(item?.id);
                    upsellOptions[upsellProduct.id] = preSelectedUpsellOptions; // Correctly map upsell product ID to options
                }
            });

            // Process the main product
            if (item?.product?.sku === product?.sku) {
                const preSelectedOptions = item?.customizable_options?.reduce((acc, option) => {
                    option.values.forEach(value => {
                        setFinalPrice(prevPrice => prevPrice + value.price.value);

                        // Check for matching upsell options
                        product?.upsell_products?.forEach((usp) => {
                            usp?.options?.forEach((usp_options) => {
                                const usp_option_id = usp_options?.option_id;
                                usp_options?.checkbox_option?.forEach((usp_cb_option) => {
                                    if (usp_cb_option?.title === value?.label) {
                                        const usp_option_type_id = usp_cb_option?.option_type_id;
                                        const usp_option_price = usp_cb_option?.price;
                                        const usp_option_priceType = usp_cb_option?.price_type;
                                        const usp_option_title = usp_cb_option?.title;

                                        setSelectedUpsellOptions(prevState => {
                                            const newState = { ...prevState };
                                            if (!newState[usp.id]) {
                                                newState[usp.id] = {};
                                            }
                                            newState[usp.id][usp_option_type_id] = {
                                                optionId: usp_option_id,
                                                optionTypeId: usp_option_type_id,
                                                price: usp_option_price*rate,
                                                priceType: usp_option_priceType,
                                                title: usp_option_title
                                            };

                                            // Update upsell prices
                                            let upsellTotalPrice = upsellPrices[usp.id]?.basePrice || 0;
                                            for (const option of Object.values(newState[usp.id])) {
                                                upsellTotalPrice += parseFloat(option.price) || 0;
                                            }

                                            setUpsellPrices(prevPrices => ({
                                                ...prevPrices,
                                                [usp.id]: { ...prevPrices[usp.id], finalPrice: upsellTotalPrice*rate }
                                            }));

                                            return newState;
                                        });
                                    }
                                });

                                usp_options?.radio_option?.forEach((usp_radio_option) => {
                                    if (usp_radio_option?.title === value?.label) {
                                        const usp_option_type_id = usp_radio_option?.option_type_id;
                                        const usp_option_price = usp_radio_option?.price;
                                        const usp_option_priceType = usp_radio_option?.price_type;
                                        const usp_option_title = usp_radio_option?.title;

                                        setSelectedUpsellOptions(prevState => {
                                            const newState = { ...prevState };
                                            if (!newState[usp.id]) {
                                                newState[usp.id] = {};
                                            }

                                            Object.keys(newState[usp.id]).forEach(key => {
                                                if (newState[usp.id][key].optionId === usp_option_id) {
                                                    delete newState[usp.id][key];
                                                }
                                            });

                                            newState[usp.id][usp_option_type_id] = {
                                                optionId: usp_option_id,
                                                optionTypeId: usp_option_type_id,
                                                price: usp_option_price*rate,
                                                priceType: usp_option_priceType,
                                                title: usp_option_title
                                            };

                                            // Update upsell prices
                                            let upsellTotalPrice = upsellPrices[usp.id]?.basePrice || 0;
                                            for (const option of Object.values(newState[usp.id])) {
                                                upsellTotalPrice += parseFloat(option.price) || 0;
                                            }

                                            setUpsellPrices(prevPrices => ({
                                                ...prevPrices,
                                                [usp.id]: { ...prevPrices[usp.id], finalPrice: upsellTotalPrice*rate }
                                            }));

                                            return newState;
                                        });
                                    }
                                });
                            });
                        });

                        acc[value.value] = {
                            optionId: option.id,
                            optionTypeId: parseInt(value.value, 10),
                            price: value.price.value*rate,
                            priceType: 'FIXED',
                            title: value.label
                        };
                    });
                    return acc;
                }, {});

                setFoundUpsellItems(upsellItems);
                setSelectedUpsellOptions(upsellOptions); // Set options for all upsell items
                setFoundItem(item.id);
                setCurrentQty(item.quantity);
                setIsUpdateAble(true);
                setSelectedOptions(preSelectedOptions);
            }
        });
    }, [cartFromCartProvider, product]);

    useEffect(() => {
        const calculateTotalPrice = () => {
            let total = basePrice;

            // Add base price of upsell products
            upsellProducts.forEach(upsell => {
                const upsellBasePrice = upsellPrices[upsell.id]?.basePrice || 0;
                total += parseFloat(upsellBasePrice);
            });

            // Add options price of main product
            Object.values(selectedOptions).forEach(option => {
                const optionPrice = parseFloat(option.price) || 0;
                total += optionPrice;
            });

            // Add options price of upsell products
            Object.keys(selectedUpsellOptions).forEach(upsellId => {
                product?.upsell_products?.map((usp) => {
                    if (usp?.id == upsellId) {
                        Object.values(selectedUpsellOptions[upsellId]).forEach(option => {
                            const optionPrice = parseFloat(option.price) || 0;
                            total += optionPrice;
                        });
                    }
                })
            });

            setFinalPrice(total);
        };

        calculateTotalPrice();
    }, [product, selectedOptions, selectedUpsellOptions, upsellProducts, upsellPrices, basePrice]);


    const handleOptionChange = (optionId, optionTypeId, price, priceType, isCheckbox, title, isUpsell = false, upsellId = null) => {

        if (isUpsell) {
            setSelectedUpsellOptions(prevState => {
                const newState = { ...prevState };
                if (!newState[upsellId]) {
                    newState[upsellId] = {};
                }
                if (isCheckbox) {
                    if (newState[upsellId][optionTypeId]) {
                        delete newState[upsellId][optionTypeId];
                    } else {
                        newState[upsellId][optionTypeId] = { optionId, optionTypeId, price:price*rate, priceType, title };
                    }
                } else {
                    Object.keys(newState[upsellId]).forEach(key => {
                        if (newState[upsellId][key].optionId === optionId) {
                            delete newState[upsellId][key];
                        }
                    });
                    newState[upsellId][optionTypeId] = { optionId, optionTypeId, price:price*rate, priceType, title };
                }

                // Update upsell prices
                let upsellTotalPrice = upsellPrices[upsellId]?.basePrice || 0;
                for (const option of Object.values(newState[upsellId])) {
                    upsellTotalPrice += parseFloat(option.price) || 0;
                }

                setUpsellPrices(prevPrices => ({
                    ...prevPrices,
                    [upsellId]: { ...prevPrices[upsellId], finalPrice: upsellTotalPrice*rate }
                }));

                return newState;
            });
        } else {
            let is_main_checked = false;
            setSelectedOptions(prevState => {
                const newState = { ...prevState };
                if (isCheckbox) {
                    if (newState[optionTypeId]) {
                        is_main_checked = false;
                        delete newState[optionTypeId];
                    } else {
                        is_main_checked = true;
                        newState[optionTypeId] = { optionId, optionTypeId, price:price*rate, priceType, title };
                    }
                } else {
                    Object.keys(newState).forEach(key => {
                        if (newState[key].optionId === optionId) {
                            delete newState[key];
                        }
                    });
                    newState[optionTypeId] = { optionId, optionTypeId, price:price*rate, priceType, title };
                }

                // Update main product final price
                let totalPrice = basePrice;
                for (const option of Object.values(newState)) {
                    totalPrice += parseFloat(option.price) || 0;
                }

                setFinalPrice(totalPrice);
                return newState;
            });

            product?.upsell_products?.map((usp) => {
                const usp_id = usp?.id;
                usp?.options?.map((usp_options) => {
                    const usp_option_id = usp_options?.option_id;
                    usp_options?.checkbox_option?.map((usp_cb_option) => {
                        if (usp_cb_option?.title == title) {
                            const usp_option_type_id = usp_cb_option?.option_type_id;
                            const usp_option_price = usp_cb_option?.price;
                            const usp_option_priceType = usp_cb_option?.price_type;
                            const usp_option_title = usp_cb_option?.title;
                            setSelectedUpsellOptions(prevState => {
                                const newState = { ...prevState };
                                if (!newState[usp_id]) {
                                    newState[usp_id] = {};
                                }

                                /* if (newState[usp_id][usp_option_type_id]) {
                                    delete newState[usp_id][usp_option_type_id];
                                } else {
                                    newState[usp_id][usp_option_type_id] = { optionId: usp_option_id, optionTypeId: usp_option_type_id, price: usp_option_price, priceType: usp_option_priceType, title: usp_option_title };
                                } */

                                if (is_main_checked) {
                                    delete newState[usp_id][usp_option_type_id];
                                    newState[usp_id][usp_option_type_id] = { optionId: usp_option_id, optionTypeId: usp_option_type_id, price: usp_option_price*rate, priceType: usp_option_priceType, title: usp_option_title };
                                } else {
                                    delete newState[usp_id][usp_option_type_id];
                                }

                                // Update upsell prices
                                let upsellTotalPrice = upsellPrices[usp_id]?.basePrice || 0;
                                for (const option of Object.values(newState[usp_id])) {
                                    upsellTotalPrice += parseFloat(option.price) || 0;
                                }

                                setUpsellPrices(prevPrices => ({
                                    ...prevPrices,
                                    [usp_id]: { ...prevPrices[usp_id], finalPrice: upsellTotalPrice*rate }
                                }));

                                return newState;
                            });
                        }
                    })

                    usp_options?.radio_option?.map((usp_cb_option) => {
                        if (usp_cb_option?.title == title) {
                            const usp_option_type_id = usp_cb_option?.option_type_id;
                            const usp_option_price = usp_cb_option?.price;
                            const usp_option_priceType = usp_cb_option?.price_type;
                            const usp_option_title = usp_cb_option?.title;
                            setSelectedUpsellOptions(prevState => {
                                const newState = { ...prevState };
                                if (!newState[usp_id]) {
                                    newState[usp_id] = {};
                                }

                                Object.keys(newState[usp_id]).forEach(key => {
                                    if (newState[usp_id][key].optionId === usp_option_id) {
                                        delete newState[usp_id][key];
                                    }
                                });

                                newState[usp_id][usp_option_type_id] = { optionId: usp_option_id, optionTypeId: usp_option_type_id, price: usp_option_price*rate, priceType: usp_option_priceType, title: usp_option_title };

                                // Update upsell prices
                                let upsellTotalPrice = upsellPrices[usp_id]?.basePrice || 0;
                                for (const option of Object.values(newState[usp_id])) {
                                    upsellTotalPrice += parseFloat(option.price) || 0;
                                }

                                setUpsellPrices(prevPrices => ({
                                    ...prevPrices,
                                    [usp_id]: { ...prevPrices[usp_id], finalPrice: upsellTotalPrice*rate }
                                }));

                                return newState;
                            });
                        }
                    })

                })
            })
        }
    };


    // Function to recalculate final price considering main and upsell products
    const calculateFinalPrice = (upsellOptions) => {
        let totalPrice = basePrice;

        // Add price for main product options
        for (const option of Object.values(selectedOptions)) {
            if (option.priceType === 'FIXED') {
                totalPrice += parseFloat(option.price);
            }
        }

        // Add price for selected upsell products
        for (const [upsellId, options] of Object.entries(upsellOptions)) {
            const upsellPrice = upsellPrices[upsellId]?.finalPrice || 0;
            totalPrice += upsellPrice;
        }

        setFinalPrice(totalPrice);
    };


    const handleAddToCart = async () => {
        const addProductToCart = async (product, options, qty) => {
            let links = `[{}]`;
            let isNotRadio = true;
            const selectedOptionsArray = Object.values(options);
            selectedOptionsArray?.map((opt) => {
                if (opt.title == 'Community') {
                    if (product?.downloadable_product_links) {
                        links = `[${product?.downloadable_product_links
                            ?.map((link) => {
                                if (!link.title.startsWith('ENT')) {
                                    return (`{ link_id: ${link.id} }`)
                                }
                            })
                            .join('')}]`;
                    }
                } else if (opt.title == 'Enterprise') {
                    isNotRadio = false;
                    if (product?.downloadable_product_links) {
                        links = `[${product?.downloadable_product_links
                            ?.map((link) => {
                                if (!link.title.startsWith('CMT')) {
                                    return (`{ link_id: ${link.id} }`)
                                }
                            })
                            .join('')}]`;
                    }
                } else {
                    isNotRadio = false;
                    links = `[${product?.downloadable_product_links
                        ?.map((link) => {
                            if (!link.title.startsWith('CMT')) {
                                return (`{ link_id: ${link.id} }`)
                            }
                        })
                        .join('')}]`;
                }
            });
            if (isNotRadio) {
                links = `[${product?.downloadable_product_links
                    ?.map((link) => {
                        return (`{ link_id: ${link.id} }`)
                    })
                    .join('')}]`;
            }

            let optionsString = `[{}]`;
            if (options) {
                optionsString = `[${Object.entries(options)
                    .map(([id, option]) => {
                        if (Array.isArray(option) && option.length > 0) {
                            const optionTypeIds = option.map(opt => dlv(opt, 'optionTypeId')).join(',');
                            return `{ id: ${id}, value_string: "${optionTypeIds}" }`;
                        } else {
                            const valueString = dlv(option, 'optionTypeId');
                            if (valueString !== undefined) {
                                return `{ id: ${dlv(option, 'optionId')}, value_string: "${valueString}" }`;
                            }
                        }
                        return ''; // Return empty string for unmatched cases
                    })
                    .filter(Boolean) // Filter out empty strings
                    .join('')}]`;
            }

            const add = await addCartItem(product.sku, qty, links, optionsString);
            if (dlv(add, 'data.addDownloadableProductsToCart.cart')){
                let quantity = dlv(add, 'data.addDownloadableProductsToCart.cart.items').reduce((total, item) => {
                    return total + parseInt(item.quantity);
                  }, 0);
                  dispatch(cartActions.setItems(quantity));

            }
            return add?.data?.addDownloadableProductsToCart?.cart;
        };

        if (isUpdateAble) {
            const remove = await removeCartItem(foundItem);

            for (const id of foundUpsellItems) {
                await removeCartItem(id);
            }

            /* for (const upsell of upsellProducts) {
                product?.upsell_products?.map((usp)=>{
                    if(usp?.sku === upsell?.sku){
                        if (selectedUpsellOptions[upsell.id]) {
                    console.log(selectedUpsellOptions[upsell.id])
                        }
                    }
                })
            } */

            if (remove?.data?.removeItemFromCart?.cart) {
                const mainProductCart = await addProductToCart(product, selectedOptions, currentQty);
                const addUpsellProductsToCart = async () => {
                    // Use map to create an array of promises
                    const addPromises = upsellProducts.map(async (upsell) => {
                        // Find the corresponding upsell product
                        const matchingUpsell = product?.upsell_products?.find((usp) => usp?.sku === upsell?.sku);

                        if (matchingUpsell && selectedUpsellOptions[upsell.id]) {
                            await addProductToCart(matchingUpsell, selectedUpsellOptions[upsell.id], 1);
                        }
                    });

                    // Wait for all promises to resolve
                    await Promise.all(addPromises);
                };
                addUpsellProductsToCart();
                setCartState(true);
                return mainProductCart;
            }
        } else {
            const mainProductCart = await addProductToCart(product, selectedOptions, currentQty);
            for (const upsell of upsellProducts) {
                if (selectedUpsellOptions[upsell.id]) {
                    await addProductToCart(upsell, selectedUpsellOptions[upsell.id], 1);
                }
            }
        }
        setCartState(true);
    };

    let level2Category = '';
    let level2CategoryName = '';

    try {
        for (const item of dlv(product, 'categories')) {
            if (item.level === 2) {
                level2Category = item.url_key;
                level2CategoryName = item.name;
                break;
            }
        }
    } catch (e) { }

    return (
        <div className="">
            <div className='combo_products_info border-black py-6 border-b'>
                <h2 className={`${sarabun}`}>{product?.name}</h2>
                <p className='primary_text'>for {level2CategoryName}</p>
                {
                    product?.upsell_products?.map((usp) => (
                        <div key={usp.id}>
                            <h2 className={`${sarabun}`}>{usp?.name}</h2>
                            <p className='primary_text'>for {level2CategoryName}</p>
                        </div>
                    ))
                }
            </div>
            {options.length > 0 && (
                <div className={`combo_products_editions space-y-4`}>
                    {options.map(option => (
                        <div key={option.option_id} className="space-y-2">
                            <p className='primary_text'>{option.title}</p>
                            <div className={`opt_inner`}>
                                {option.checkbox_option && option.checkbox_option.map(opt => (
                                    <div key={opt.option_type_id} className={`radio_block flex items-center space-x-2 justify-center`}>
                                        <input
                                            type="checkbox"
                                            id={`radio-option-${opt.option_type_id}`}
                                            className='radio'
                                            name={`radio-option-${option.option_id}`}
                                            checked={!!selectedOptions[opt.option_type_id]}
                                            onChange={() => handleOptionChange(option.option_id, opt.option_type_id, parseFloat(opt.price), opt.price_type, true, opt.title)}
                                        />
                                        <label htmlFor={`radio-option-${opt.option_type_id}`} className='ed_label text-base'>
                                            {opt.title} (+{globalMagento?.currencySymbol}{(opt.price*rate).toFixed(2)})
                                        </label>
                                    </div>
                                ))}
                                {option.radio_option && selectedOptions && option.radio_option.map(opt => (
                                    <div key={opt.option_type_id} className={`radio_block flex items-center space-x-2 justify-center`}>
                                        <input
                                            type="checkbox"
                                            id={`radio-option-${opt.option_type_id}`}
                                            className='radio'
                                            name={`radio-option-${option.option_id}`}
                                            checked={!!selectedOptions[opt.option_type_id]}
                                            onChange={() => handleOptionChange(option.option_id, opt.option_type_id, parseFloat(opt.price), opt.price_type, false, opt.title)}
                                        />
                                        <label className='ed_label text-base' htmlFor={`radio-option-${opt.option_type_id}`}>
                                            {opt.title} {opt?.price >0 && `(+${globalMagento?.currencySymbol}${(opt.price*rate).toFixed(2)})`}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className='custom_price text-xl md:text-2xl font-bold'>
                {dlv(product, 'combo_discount_value') && product?.upsell_products?.length > 0 && <del className="actual_price mr-2">{`${globalMagento?.currencySymbol}${finalPrice.toFixed(2)}`}</del>}
                <span className="total_price">
                    {product?.upsell_products?.length > 0 && `${globalMagento?.currencySymbol}${(finalPrice - discountValue).toFixed(2)}`}
                    {product?.upsell_products?.length <= 0 && `${globalMagento?.currencySymbol}${(finalPrice.toFixed(2))}`}
                </span>
            </div>

            {successMessage && <div className={`text-green-500 mt-2`}>{successMessage}</div>}
            <div className={`mt-4`}>
                <div className={``}>
                    {!product?.buy_from_url && (
                        <button 
                            className={`primary_cta loading_action text-base md:text-lg xl:text-xl min-w-[8em] bg-transparent text-primaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-primaryColor hover:text-secondaryColor transition-all`} 
                            onClick={handleAddToCart}
                        >
                            {product?.is_service ? isUpdateAble ? 'Update Service' : 'Buy Now' : isUpdateAble ? 'Update Cart' : 'Add To Cart'}
                        </button>
                    )}
                    {product?.buy_from_url && (
                        <Link 
                            target='_blank' 
                            href={`${dlv(product, 'buy_from_url')}`} 
                            className={`primary_cta text-base md:text-lg xl:text-xl min-w-[8em] bg-transparent text-primaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-primaryColor hover:text-secondaryColor transition-all`}
                        >
                            {dlv(product, 'buy_from_title')}
                        </Link>
                    )}
                </div>
            </div>
            <AddCartDialog cartState={cartState} setCartState={setCartState} product={product} closeModal={closeModal} />
        </div>
    );
}