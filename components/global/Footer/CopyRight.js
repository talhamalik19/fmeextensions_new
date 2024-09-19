import { changeStore } from '@/pages/api/store';
import dlv from 'dlv';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function CopyRight({ footerData, storeData, selectedStore }) {
    const router = useRouter();
    const handleStoreChange = async (event) => {
        changeStore(event.target.value)
        const selectedLanguage = event.target.value;
        const currentPath = router.asPath;
        let newUrl = `//`;

        dlv(storeData,'data.availableStores').map(({ code })=>{
            if(code !== 'default'){
                newUrl = currentPath.includes(`/${code}/`) ? currentPath.replace(/\/(code)\//, `/${selectedLanguage}/`) : `/${selectedLanguage}${currentPath}`;
            }
        })

        if(newUrl.startsWith('/en')){
            newUrl = newUrl.replace('/en','');
        }

        window.location.href = newUrl
    };
    return (

        <div className="footer_bg">
            <div className="main_container">
                <div className="copy_right_inner gap-2">
                    {/* <div className="lt_col flex gap-5 lg:gap-3 xl:gap-6 flex-wrap items-center  justify-between lg:justify-start"> */}
                        <ul className="copy_link">
                            {dlv(footerData, 'cards') &&
                                dlv(dlv(footerData, 'cards')[0], 'button').map((button, index) => (
                                    <li key={`footer-bottom${index}`}> <Link className='loading_action' href={dlv(button, 'field_redirect')}>{dlv(button, 'field_text')}</Link></li>
                                ))
                            }
                        </ul>
                        {dlv(footerData, 'text') && <p className='text-center lg:text-left text-sm text-[#616161]'>{dlv(footerData, 'text')}</p>}
                    {/* </div> */}
                    {/* <div className="lang_switch flex gap-3 flex-wrap">
                        <select
                            aria-label="Select Language"
                            name="store"
                            id="store"
                            className=" text-base lg:text-xl text-[#B5B5B5] px-6 py-2 border border-solid border-[#343434] bg-[#262626] focus:border-[1px] outline-none shadow-sm rounded-full"
                            value={selectedStore || dlv(storeData, 'data.storeConfig.code')}
                            onChange={handleStoreChange}
                        >
                            {dlv(storeData, 'data.availableStores') && dlv(storeData, 'data.availableStores').map((store, index) => (
                                <option key={`code-${index}`} value={store.code === 'default' ? "en" : store.code}>
                                    {store.code === 'default' ? "English" : store.store_name}
                                </option>
                            ))}
                        </select>
                    </div> */}
                </div>
            </div>
        </div>
    )
}
