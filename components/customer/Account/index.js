import dlv from "dlv";
import Link from "next/link";
import React from "react";
import AccountAddressPlaceholder from "@/components/shared/AccountAddressPlaceholder";

const Account = ({ user, selectedItem, sarabun }) => {
  const customer = user || null;

  return (
    <>
      {/* {manageOrderState === false && (
        <> */}
        <div className="py-4 flex-1 md:p-4 lg:p-8 account-right-col">
     <h2 className={`text-lg md:text-2xl xl:text-3xl text-titleColor font-semibold mb-4 lg:mb-8 after:'' after:w-[2em] after:h-[2px] after:bg-primaryColor after:block after:mt-1 ${sarabun}`}>
                Account
              </h2>
          <section className="border-solid border-b border-[#E4E4E4] pb-8 mb-8">
            <h2 className={`text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium mb-4 lg:mb-6 ${sarabun}`}>
              Account Information
            </h2>
            <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y divide-textColor ${sarabun}`}>
              {/* First Column */}
              <div className="w-full shadow-[0_0_10px_0_rgb(0,0,0,0.10)] rounded-lg p-6">
                <div className="space-y-4">
                  <h4 className={`text-gray-800 text-base sm:text-lg xl:text-xl font-medium ${sarabun}`}>
                    Contact Information
                  </h4>
                  <div className="space-y-2">
                    <p className="text-base text-textColor">
                      {dlv(customer, "data.customer.firstname")}{" "}
                      {dlv(customer, "data.customer.lastname")}
                    </p>
                    <p className="text-base text-textColor">
                      {dlv(customer, "data.customer.email")}
                    </p>
                  </div>
                </div>
                <div className="pt-3">
                  <div className="text-sm text-gray-600 flex items-center gap-6">
                    <Link
                      className="text-base text-primaryColor duration-150 hover:underline"
                      href={`/customer/account/accountinfo`}
                    >
                      Edit
                    </Link>
                    <Link
                      href={{pathname: '/customer/account/accountinfo', query: {password: true}}}
                      className="text-base text-primaryColor duration-150 hover:underline"
                    >
                      Change Password
                    </Link>
                  </div>
                </div>
              </div>
              {/* Second Column */}
              <div className="w-full shadow-[0_0_10px_0_rgb(0,0,0,0.10)] rounded-lg p-6">
                <div className="space-y-4">
                  <h4 className={`text-gray-800 text-base sm:text-lg xl:text-xl font-medium ${sarabun}`}>
                    Newsletters
                  </h4>
                  <div className="space-y-2">
                    <p className="text-base text-textColor">
                      {dlv(customer, "data.customer.is_subscribed")
                        ? "You are Subscribed to 'General Subscriptions'"
                        : `You aren't subscribed to our newsletter.`}
                    </p>
                    {/* {dlv(customer, "data.customer.is_subscribed") &&
                      setValid(true)} */}
                  </div>
                </div>
                <div className="pt-3">
                  <div className="text-sm text-gray-600 flex items-center gap-6">
                    <span className="flex items-center gap-2">
                      <Link
                        href={"/customer/account/newsletter"}
                        className="text-base text-primaryColor duration-150 hover:underline"
                      >
                        Edit
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="pb-8 mb-8">
            <h2 className={`text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium mb-4 lg:mb-8 flex items-end flex-wrap gap-3 ${sarabun}`}>
              Address Book
              <Link
              href={'/customer/account/address'}
                className="text-sm md:text-base text-primaryColor duration-150 hover:underline"
              >
                Manage Addresses
              </Link>
            </h2>
            {dlv(customer, "data.customer.addresses") ? 
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y divide-textColor"> 
            
              {/* First Column */}
              <div className="w-full shadow-[0_0_10px_0_rgb(0,0,0,0.10)] rounded-lg p-6">
                <div className="space-y-4">
                  <h4 className={`text-gray-800 text-base sm:text-lg xl:text-xl font-medium ${sarabun}`}>
                    Default Billing Address
                  </h4>
                  {dlv(customer, "data.customer.addresses") && dlv(customer, "data.customer.addresses").find(address=>(address.id ===parseInt(dlv(customer, "data.customer.default_billing")) )) ? (
                    dlv(customer, "data.customer.addresses").map(
                      (address, index) => {
                        if (
                          customer.data.customer.default_billing == address.id
                        ) {
                          return (
                            <div key={`address-${index}`} className="space-y-2">
                              <p className="text-base text-textColor">
                                {address.firstname} {address.lastname}
                              </p>
                              <p className="text-base text-textColor">
                                {address.company}
                              </p>
                              {address.street.map((street, index) => (
                                <p
                                  key={`street-${index}`}
                                  className="text-base text-textColor"
                                >
                                  {street}
                                </p>
                              ))}
                              <p className="text-base text-textColor">
                                {address.city}, {address.region.region}
                              </p>
                              <p className="text-base text-textColor">
                                {address.postcode}
                              </p>
                              <p className="text-base text-textColor">
                                T: {address.telephone}
                              </p>
                              <ul className="pt-3">
                                <div className="text-sm text-gray-600 flex items-center gap-6">
                                  <Link
                                  href={{pathname : '/customer/account/address', query: { changeBilling: true}}}
                                    className="text-base text-primaryColor duration-150 hover:underline"
                                  >
                                    Change Billing Address
                                  </Link>
                                </div>
                              </ul>
                            </div>
                          );
                        } 
                      }
                    )) : <p className="text-base text-textColor">No Default Billing Address Added</p>

                  }
                </div>
              </div>

              {/* Second Column */}
              <div className="w-full shadow-[0_0_10px_0_rgb(0,0,0,0.10)] rounded-lg p-6 hidden">
                <div className="space-y-4">
                  <h4 className={`text-gray-800 text-base sm:text-lg xl:text-xl font-medium ${sarabun}`}>
                    Default Shipping Address
                  </h4>
                  {dlv(customer, "data.customer.addresses") && dlv(customer, "data.customer.addresses").find(address=>(address.id === parseInt(dlv(customer, "data.customer.default_shipping")))) ? (
                    dlv(customer, "data.customer.addresses").map(
                      (address, index) => {
                        if (
                          customer.data.customer.default_shipping == address.id
                        ) {
                          return (
                            <div key={`address-${index}`} className="space-y-2">
                              <p className="text-base text-textColor">
                                {address.firstname} {address.lastname}
                              </p>
                              <p className="text-base text-textColor">
                                {address.company}
                              </p>
                              {address.street.map((street, index) => (
                                <p
                                  key={`street-${index}`}
                                  className="text-base text-textColor"
                                >
                                  {street}
                                </p>
                              ))}
                              <p className="text-base text-textColor">
                                {address.city}, {address.region.region}
                              </p>
                              <p className="text-base text-textColor">
                                {address.postcode}
                              </p>
                              <p className="text-base text-textColor">
                                T: {address.telephone}
                              </p>
                              <ul className="pt-3">
                                <div className="text-sm text-gray-600 flex items-center gap-6">
                                  <Link
                                    className="text-base text-primaryColor duration-150 hover:underline"
                                    href={{pathname : '/customer/account/address', query: { changeShipping: true}}}
                                  >
                                    Change Shipping Address
                                  </Link>
                                </div>
                              </ul>
                            </div>
                          );
                        }
                      }
                    )) : <p className="text-base text-textColor">No Default Shipping Address Added</p>}
                </div>
              </div>
            </div> : <AccountAddressPlaceholder/>}
          </section>
          </div>
        {/* </>
      )} */}
    </>
  );
};

export default Account;
