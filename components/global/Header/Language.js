import { changeStore } from '@/pages/api/store';
import dlv from 'dlv';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Language({ selectedStore, storeData, closeSideBar, languageSidebar, customBlocksData, sarabun }) {
    const router = useRouter()
    const handleCurrencyChange = async (event) => {
        changeStore(storeCode);
        if(storeCode == 'default'){
            window.location.href = `${router.asPath}`
        }else{
            window.location.href =`/${storeCode}${router.asPath}`
        }
    };

    const title = 'Select a Language';
    const [storeCode, setCurrencyCode] = useState(selectedStore);

    const handleClick = (event, store) => {
        // Remove 'active' class from all elements with 'currency' class
        document.querySelectorAll('.language').forEach(element => {
            element.classList.remove('active');
        });

        // Add 'active' class to the current clicked element
        event.target.classList.add('active');

        // Update currencyCode state
        setCurrencyCode(store?.code);

    };

    return (
        <>
            <aside data-pushbar-id="right" data-pushbar-direction="right" className={`${languageSidebar ? 'opened' : ''} main_sidebar`}>
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
                                {dlv(storeData, 'data.availableStores') ? dlv(storeData, 'data.availableStores').map((store, index) => (
                                    <li key={`code-${index}`} onClick={(event) => handleClick(event, store)} value={store.code === 'default' ? "en" : store.code} className={selectedStore === store.code ? 'language active' : 'language'}>
                                        {store.code === 'default' ? "English" : store.store_name}
                                    </li>
                                )) : <li>............</li>}
                            </ul>
                        </div>
                    </div>
                    <div className="bottom_block">
                        <button onClick={handleCurrencyChange} className='primary_cta'>{customBlocksData?.languageBtn ? customBlocksData?.languageBtn[0].button.find((item)=>item.field_redirect === storeCode) ? (customBlocksData?.languageBtn[0].button.find((item)=>item.field_redirect === storeCode)).field_text : 'Confirm Selection' : 'Confirm Selection'} </button>
                    </div>
                </div>
            </aside>
        </>
    );
}
