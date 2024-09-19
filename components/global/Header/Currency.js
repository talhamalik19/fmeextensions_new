import { changeCurrency } from '@/pages/api/currency';
import dlv from 'dlv';
import Link from 'next/link';
import { useState } from 'react';

export default function Currency({ selectedCurrency, currencyData, closeSideBar, currencySidebar, customBlocksData, selectedStore, sarabun }) {
    const handleCurrencyChange = async (event) => {
        changeCurrency(currencyCode);
        location.reload();
    };

    const title = 'Select a Currency';
    const [currencyCode, setCurrencyCode] = useState(selectedCurrency);

    const handleClick = (event, code) => {
        // Remove 'active' class from all elements with 'currency' class
        document.querySelectorAll('.currency').forEach(element => {
            element.classList.remove('active');
        });

        // Add 'active' class to the current clicked element
        event.target.classList.add('active');

        // Update currencyCode state
        setCurrencyCode(code);
    };
    
    return (
        <>
        <aside data-pushbar-id="right" data-pushbar-direction="right" className={`${currencySidebar ? 'opened' : ''} main_sidebar`}>
            <div className="lang_cur_block">
                <div className="lang_cur_inner">
                    <div className="side_bar_top">
                        <h3 className={`title ${sarabun}`}>{title}</h3>
                        <div onClick={closeSideBar} className="close_side_bar" >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <ul className="lang_cur_list">
                            {
                                dlv(currencyData, 'available_currency_codes') ? dlv(currencyData, 'available_currency_codes').map((code, index) => (
                                    <li 
                                        key={index} 
                                        onClick={(event) => handleClick(event, code)} 
                                        className={selectedCurrency === code ? 'currency active' : 'currency'}
                                    >
                                        {code}
                                    </li>
                                )) : ''
                            }
                        </ul>
                    </div>
                </div>
                <div className="bottom_block">
                <button onClick={handleCurrencyChange} className='primary_cta'>{customBlocksData?.languageBtn ? customBlocksData?.languageBtn[0].button.find((item)=>item.field_redirect === selectedStore) ? (customBlocksData?.languageBtn[0].button.find((item)=>item.field_redirect === selectedStore)).field_text : 'Confirm Selection' : 'Confirm Selection'} </button>
                </div>
            </div>
            </aside>
        </>
    );
}
