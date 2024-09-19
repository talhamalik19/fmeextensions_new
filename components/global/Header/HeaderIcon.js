import Link from 'next/link'
import { useEffect, useState } from 'react'
import AccountIcon from './AccountIcon';
import dlv from 'dlv';
import { logout } from '@/pages/api/login';
import { getCartItems } from '@/pages/api/cart';
import { changeCurrency } from '@/pages/api/currency';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '@/store/cartSlice';
import { getCookie } from 'cookies-next';
import Language from './Language';
import Currency from './Currency';

export default function HeaderIcon({ user, setUser, currencyData, selectedCurrency, hideItem, customBlocksData, storeData, selectedStore, sarabun }) {
  const selectedStoreName = storeData?.data?.availableStores?.find((store)=> store.code == selectedStore);  
  const [cartQuantity, setCartQuantity] = useState(0);
  const dispatch = useDispatch();
  const cart_quantity = useSelector((state) => state.cart.items);
  const getCart = async () => {
    if (getCookie('cart_id')) {
      const cart = await getCartItems();

      if (dlv(cart, 'data.cart.items')) {
        let quantity = dlv(cart, 'data.cart.items').reduce((total, item) => {
          return total + parseInt(item.quantity);
        }, 0);
        dispatch(cartActions.setItems(quantity));
        setCartQuantity(quantity);
      } else {
        dispatch(cartActions.setItems(0));
        setCartQuantity(0)
      }
    }
  }

  useEffect(() => {
    getCart();
  }, [user, currencyData, selectedCurrency]);

  let customer = user || null;

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setUser(null);
    setIsOpen(!isOpen);
    logout()
  };

  const handleCurrencyChange = async (event) => {
    changeCurrency(event.target.value)
    location.reload();
  };

  // **************************************

  const [languageSidebar, setlanguageSidebar] = useState(false);
  const [currencySidebar, setCurrencySidebar] = useState(false);
  const [sideBar, setSideBar] = useState(false);

  const handleClickOpen = () => {
    // Enable body scroll
    document.body.style.overflow = 'hidden';
    setSearchOpen(true);
  };

  const appendOverlay = () => {
    removeOverlay(); // Ensure any existing overlay is removed first
    
    const overlay = document.createElement('div');
    overlay.classList.add('pushbar_overlay');
    
    // Get the first <header> element
    const headerElement = document.getElementsByTagName("header")[0];
    headerElement.appendChild(overlay);
    overlay.classList.add('opened');
  
    overlay.addEventListener('click', closeSideBar);
  };
  
  const removeOverlay = () => {
    const overlay = document.querySelector('.pushbar_overlay');
    
    if (overlay) {
      overlay.classList.remove('opened');
      overlay.removeEventListener('click', closeSideBar); // Remove the event listener
      overlay.remove(); // Properly remove the overlay element
    }
  };
  
  // Close the sidebar and remove the overlay
  const closeSideBar = () => {
    setSideBar(false);
    setlanguageSidebar(false);
    setCurrencySidebar(false);
    removeOverlay();
    document.body.style.overflow = 'auto';
  };
  
  // Reopen the sidebar and add the overlay
  const openLanguage = () => {
    setlanguageSidebar(true);
    setCurrencySidebar(false);
    appendOverlay();
    document.body.style.overflow = 'hidden';
  };
  
  const openCurrency = () => {
    setCurrencySidebar(true);
    setlanguageSidebar(false);
    appendOverlay();
    document.body.style.overflow = 'hidden';
  };
  


  return (
    <div className={hideItem ? 'header_icon right_col' : 'header_icon'}>
      <ul className="icon">
        {hideItem ? <li className='account'>
          <div className="relative inline-block text-left">
            {customer != null ?
              <div>
                <button
                  onClick={toggleDropdown}
                  type="button"
                  className="hd_acc_btn inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none items-center"
                >
                  <AccountIcon />
                  <span>{dlv(customer, 'data.customer.firstname')}</span>
                </button>
              </div>
              :
              <Link className='loading_action' aria-label='Login' href="/login"> <AccountIcon /><span className='loading_action'>{dlv(customBlocksData, 'loginText.0.login')}</span></Link>
            }

            {customer && isOpen && (
              <div className="origin-top-right z-10 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  {/* Dropdown items */}
                  <Link
                    onClick={toggleDropdown}
                    href="/customer/account"
                    className="loading_action block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {dlv(customBlocksData, 'loginText.0.account')}
                  </Link>

                  <Link
                    onClick={handleLogout}
                    href="/"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    {dlv(customBlocksData, 'loginText.0.signout')}
                  </Link>
                </div>
              </div>
            )}
          </div>
        </li> : ''}
        {!hideItem ?
          <li className='cost_type' data-pushbar-target="right" aria-label="Open Currency" onClick={openCurrency}>
            <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" viewBox="0 0 34 34" fill="none">
              <path d="M15.9375 0C16.6458 0 17.3542 0 18.0625 0C18.151 0.0177083 18.2307 0.0442708 18.3193 0.053125C19.1958 0.185937 20.0724 0.265625 20.9312 0.469271C27.4745 1.96562 32.6276 7.44635 33.7432 14.0693C33.8495 14.6891 33.9203 15.3177 34 15.9375C34 16.6458 34 17.3542 34 18.0625C33.9823 18.151 33.9557 18.2307 33.9469 18.3193C33.8318 19.1073 33.7609 19.9042 33.6016 20.6745C32.238 27.262 26.6068 32.6542 19.9661 33.7344C19.3375 33.8406 18.7 33.9115 18.0625 34C17.3542 34 16.6458 34 15.9375 34C15.8667 33.9823 15.787 33.9557 15.7161 33.9469C14.937 33.8318 14.1578 33.7609 13.3875 33.6016C6.8 32.2823 1.34583 26.6245 0.265625 19.9927C0.159375 19.3552 0.0885417 18.7 0 18.0625C0 17.3542 0 16.6458 0 15.9375C0.10625 15.1849 0.185937 14.4234 0.327604 13.6797C1.59375 6.90625 7.25156 1.38125 14.0339 0.265625C14.6714 0.159375 15.3 0.0885417 15.9375 0ZM17 1.99219C8.73021 1.99219 1.99219 8.73021 1.99219 17C1.99219 25.2609 8.7125 31.9812 16.9823 32.0078C25.2432 32.0255 31.999 25.2875 32.0078 17.0089C32.0167 8.74792 25.2786 1.99219 17 1.99219Z" fill="#242424" />
              <path d="M16.0074 9.58984C16.0074 8.88151 16.0074 8.20859 16.0074 7.52682C16.0074 6.86276 16.4146 6.40234 16.999 6.40234C17.5834 6.40234 17.9907 6.86276 17.9907 7.53568C17.9907 8.20859 17.9907 8.88151 17.9907 9.60755C18.3537 9.60755 18.7079 9.60755 19.0532 9.60755C19.4162 9.60755 19.7881 9.5987 20.1511 9.60755C20.7532 9.62526 21.1782 10.0237 21.187 10.5904C21.187 11.1659 20.762 11.5909 20.1423 11.5997C18.9115 11.6086 17.6896 11.5997 16.4589 11.6086C16.1048 11.6086 15.7417 11.5997 15.4053 11.6794C14.2985 11.9362 13.6167 12.9544 13.7495 14.1055C13.8646 15.1503 14.8032 15.9914 15.8923 16.0091C16.6094 16.0268 17.3266 16.0091 18.0527 16.0091C20.2396 16.018 22.099 17.7003 22.2495 19.7987C22.4178 22.0742 20.9126 24.0044 18.699 24.3586C18.4865 24.394 18.2652 24.394 17.9995 24.4206C17.9995 25.1466 18.0084 25.8638 17.9995 26.581C17.9995 27.0591 17.7162 27.431 17.3001 27.5638C16.6626 27.7586 16.0251 27.2982 16.0162 26.6164C15.9985 25.8992 16.0162 25.182 16.0162 24.4117C15.6798 24.4117 15.3699 24.4117 15.0511 24.4117C14.6527 24.4117 14.2542 24.4206 13.8558 24.4117C13.2449 24.4029 12.8287 23.9956 12.8199 23.4289C12.8199 22.8711 13.236 22.4461 13.8381 22.4195C14.1391 22.4107 14.4313 22.4195 14.7324 22.4195C15.8834 22.4195 17.0344 22.4372 18.1855 22.4107C19.2303 22.3841 20.0891 21.6049 20.2574 20.5867C20.4256 19.5685 19.8678 18.5503 18.9027 18.1872C18.6105 18.081 18.2829 18.0367 17.9641 18.0279C17.0699 17.9924 16.1667 18.0633 15.2813 17.9482C13.1652 17.6826 11.6688 15.7612 11.7662 13.5388C11.8548 11.5112 13.599 9.76693 15.6532 9.65182C15.7506 9.61641 15.8568 9.5987 16.0074 9.58984Z" fill="#242424" />
            </svg>

            {/* <select
            aria-label="Select Currency"
            name="dollar"
            id="dollar"
            className="py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 cursor-pointer rounded-lg"
            value={selectedCurrency || dlv(currencyData, 'base_currency_code')}
            onChange={handleCurrencyChange}
          >
            {dlv(currencyData, 'available_currency_codes') && dlv(currencyData, 'available_currency_codes').map((code, index) => (
              <option key={`code-${index}`} value={code}>
                {code}
              </option>
            ))}
          </select> */}
            {selectedCurrency}

          </li>
          : ''}
        {!hideItem ?
          <li className='cost_type lang' data-pushbar-target="right" aria-label="Open lang" onClick={openLanguage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
              <path d="M1 8.33049C1 12.3791 4.21041 15.661 8.1709 15.661C12.1314 15.661 15.3418 12.3791 15.3418 8.33049C15.3418 4.28186 12.1314 1 8.1709 1C4.21041 1 1 4.28186 1 8.33049Z" stroke="#242424" stroke-opacity="0.7" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M8.88739 1.03516C8.88739 1.03516 11.0387 3.9307 11.0387 8.329C11.0387 12.7273 8.88739 15.6228 8.88739 15.6228M7.45321 15.6228C7.45321 15.6228 5.30194 12.7273 5.30194 8.329C5.30194 3.9307 7.45321 1.03516 7.45321 1.03516M1.45117 10.8947H14.8894M1.45117 5.76332H14.8894" stroke="#242424" stroke-opacity="0.7" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

            {/* <select
            aria-label="Select Currency"
            name="dollar"
            id="dollar"
            className="py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 cursor-pointer rounded-lg"
            value={selectedCurrency || dlv(currencyData, 'base_currency_code')}
            onChange={handleCurrencyChange}
          >
            {dlv(currencyData, 'available_currency_codes') && dlv(currencyData, 'available_currency_codes').map((code, index) => (
              <option key={`code-${index}`} value={code}>
                {code}
              </option>
            ))}
          </select> */}
            {selectedStoreName?.store_name}

          </li>
          : ''}

        {!hideItem ? <li className='cost_type sprt_link'>
          <Link href={`${dlv(customBlocksData, 'support.field_redirect')}`} target={dlv(customBlocksData, 'support.field_target')} className="hd_acc_btn_spt">{dlv(customBlocksData, 'support.field_text')}</Link>

        </li> : ''}

        {hideItem ? <li className='cart'><Link aria-label='Go To Cart' href="/cart" className='loading_action'>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="34" viewBox="0 0 24 34" fill="none" className='loading_action'>
            <path d="M17.5333 5.35196C16.6394 3.11732 14.1813 2 11.9467 2C9.71204 2 7.25394 3.11732 6.36009 5.35196C6.24835 5.68715 5.46623 7.47486 6.36009 8.70391C7.14221 9.82123 8.70645 9.82123 11.9467 9.82123C15.1869 9.82123 16.7511 9.82123 17.5333 8.70391C18.4271 7.47486 17.645 5.68715 17.5333 5.35196Z" stroke="#253D4E" strokeWidth="2.2" strokeMiterlimit="10" />
            <path d="M19.7654 32.0554H4.23464C3.00559 32.0554 2 31.0498 2 29.8208V12.1672C2 10.9381 3.00559 9.93252 4.23464 9.93252H19.7654C20.9944 9.93252 22 10.9381 22 12.1672V29.8208C22 31.0498 20.9944 32.0554 19.7654 32.0554Z" stroke="#253D4E" strokeWidth="2.2" strokeMiterlimit="10" />
          </svg>
          {cart_quantity != 0 && <span className='cart_count loading_action'>{cart_quantity}</span>}</Link>
        </li> : ''}
      </ul>

      {!hideItem ? <Currency currencyData={currencyData} selectedCurrency={selectedCurrency} currencySidebar={currencySidebar} closeSideBar={closeSideBar} customBlocksData={customBlocksData} selectedStore={selectedStore} sarabun={sarabun} /> : ''}
      {!hideItem ? <Language storeData={storeData} selectedStore={selectedStore} languageSidebar={languageSidebar} closeSideBar={closeSideBar} customBlocksData={customBlocksData} sarabun={sarabun} /> : ''}
    </div>
  )
}
