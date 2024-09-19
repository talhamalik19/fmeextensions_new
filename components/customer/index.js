import AccountIcon from "@/components/global/Header/AccountIcon";
import React, { useState, useEffect } from "react";
import dlv from "dlv";
import {getOrders } from "@/pages/api/order";
import Link from "next/link";
import { useRouter } from "next/router";
import logout from "@/pages/api/logout";


const Sidebar = ({ user, setUser, address, setAddress, customerData, reviewDtl, setReviewDtl}) => {
  const router = useRouter()
  const {pathname} = router;
  let userData = user || null;
  if(customerData){
    userData = customerData;
  }

  const [selectedItem, setSelectedItem] = useState('');
  const [manageOrderState, setManageOrderState] = useState(false);

  const handleItemClick = (itemName) => {
    setSelectedItem(itemName);
   address && itemName === "Address Book" && setAddress(false)
    setManageOrderState(false)
    if(reviewDtl && itemName ==="My Product Reviews" ) {setReviewDtl(false)}
    if(itemName === "Logout"){
      logout()
      setUser(null)
   }
    
  };

  const navigation = [
    {
      href: "/customer/account/order",
      name: "My Orders",
    },
    {
      href: "/customer/account/address",
      name: "Address Book",
    },
    {
      href: "/customer/account/accountinfo",
      name: "Account Information",
    },
    {
      href: "/customer/account/newsletter",
      name: "Newsletter Subscriptions",
    },
    {
      href: "/customer/account/reviews",
      name: "My Product Reviews",
    },
    { href:'/',
      name: "Logout",
    },
  ];

  const [selectedOption, setSelectedOption] = useState(
    navigation.find(item => item.href === pathname)?.name || '',
  );

  // Update selected option when pathname changes
  useEffect(() => {
    setSelectedOption(navigation.find(item => item.href === pathname)?.name || '');
  }, [pathname]);

  const handleSelectChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption(selectedValue);
    if(selectedValue === 'Logout'){
      logout(); setUser(null)
    }
    const selectedHref = navigation.find(item => item.name === selectedValue)?.href || '/customer/account';
    router.push(selectedHref);
  };

  return (
    // <div className="main_container">
    //   <div className="flex flex-col lg:flex-row p-3 w-full">
    <>
        <div className="lg:hidden">
        {userData && (
        <select
          className="block w-full p-2 border-b border-gray-300"
          onChange={handleSelectChange}
          value={selectedOption}
        >
          <option value="">
            {dlv(userData, 'data.customer.firstname')}{' '}
            {dlv(userData, 'data.customer.lastname')}
          </option>
          {navigation.map((item, idx) => (
            <option key={idx} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      )}
        </div>

        <nav className="nav-width lg:h-full border-r border-gray-300">
          {/* Desktop Sidebar */}
          <div className="py-4 px-4 border-b lg:block hidden">
            <div className="py-4 px-4 border-t">
              <div className="flex items-center gap-x-4">
                <AccountIcon />
                <Link
                  className="cursor-pointer"
                  onClick={() => handleItemClick("Account")}
                  href={'/customer/account'}
                >
                  <span className="block text-lg text-titleColor font-medium">
                    {dlv(userData, "data.customer.firstname")}{" "}
                    {dlv(userData, "data.customer.lastname")}
                  </span>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex flex-col h-full overflow-auto">
              <ul className="px-4 text-sm font-medium flex-1">
                {navigation.map((item, idx) => (
                  <li key={idx}>
                    <Link
                      href={`${item.href}`}
                      onClick={()=>handleItemClick(item.name)}
                      className={`loading_action flex items-center gap-x-2 text-base md:text-xl text-titleColor font-medium py-3 hover:text-primaryColor  duration-150 ${pathname === item.href && 'active' }`}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
       </>
  );
};

export default Sidebar;

