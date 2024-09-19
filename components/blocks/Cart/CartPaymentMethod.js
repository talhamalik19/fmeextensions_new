import Link from 'next/link'
import dlv from 'dlv'
import { useState, useEffect } from 'react';
import { getCookie } from 'cookies-next';

export default function CartPaymentMethod({ prices, discounts, blockContent, openModal, isCouponApplied }) {
    const discountElements = discounts && discounts
    .filter(discount => dlv(discount, 'label') !== undefined && dlv(discount, 'label') !== null)
    .map((discount, index) => (
        dlv(discount, 'label')
    )).slice(0,1);

    const [currencySymbol, setCurrencySymbol] = useState('')

    try {
        useEffect(()=>{
            const symbol = getCookie('symbol_currency') || '';
            setCurrencySymbol(symbol)
        }, [])
        
    } catch (error) {
        console.log(error)
    }
    return (
        <>
            <div className="cart_payment lg:w-2/4 py-4 px-4 lg:p-[50px] col_pd">
                <div className='desk_ttl_block max-w-lg sticky top-5'>
                    <div className='desk_ttl_block_inner bg-secondaryColor rounded-lg py-2 lg:py-7'>
                        <div className="cart_total cart_sub_total  flex justify-between">
                            <div className="title">{dlv(blockContent, 'cards.2.sub_total_text')}</div>
                            <div className="value">{currencySymbol}{dlv(prices, 'subtotal_excluding_tax.value')}</div>
                        </div>
                        {discountElements.length > 0 && <div className="cart_total cart_sub_total flex justify-between">
                            {discountElements && <div className="title">{`Discount (${discountElements})`}</div>}
                            {dlv(prices, 'discount') != null && <div className="value">{currencySymbol}{dlv(prices, 'discount.amount.value')}</div>}
                        </div>}
                        {dlv(prices, 'applied_taxes.length') > 0 && <div className="cart_total cart_grand_total flex justify-between">
                            {dlv(prices, 'applied_taxes').map((tax) => (
                                <>
                                    <div div key={dlv(tax, 'label')} className='title'>{dlv(tax, 'label')}</div>
                                    <div div key={dlv(tax, 'label')} className='value'>{currencySymbol}{dlv(tax, 'amount.value')}</div>
                                </>
                            ))}
                        </div>}
                        <div className="cart_total cart_grand_total flex justify-between">
                            <div className="title">{dlv(blockContent, 'cards.2.grand_total_text')}</div>
                            <div className="value">{currencySymbol}{dlv(prices, 'grand_total.value')}</div>
                        </div>
                    </div>

                    <div className="cart_cuppon bg-[#F8EAE1] px-5 py-4 lg:py-7 rounded-br-lg rounded-bl-lg ">
                        {dlv(blockContent, 'cards.2') && <span className="apply_cuppon" onClick={openModal}>
                            {isCouponApplied ? dlv(blockContent, 'cards.2.button.1.field_text') : dlv(blockContent, 'cards.2.button.0.field_text')}
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1 10.5117L11 1.51172M11 1.51172V10.1517M11 1.51172H1.4" stroke="#414141" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>}
                    </div>
                    <Link href={dlv(blockContent, 'cards.2.button.2.field_redirect') || ''} className='primary_cta block loading_action'>{dlv(blockContent, 'cards.2.button.2.field_text')}</Link>
                </div>
            </div>
        </>
    )
}
