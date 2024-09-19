import dlv from "dlv";
import { useState, useEffect } from "react";
import AddressForm from "./AddressForm";
import Pagination from "../Account/Pagination";
import { deleteAddress } from "@/pages/api/customer";
import { customer } from "@/pages/api/login";
import Modal from "../../shared/Modal/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import AccountAddressPlaceholder from "@/components/shared/AccountAddressPlaceholder";
import AccountsTablePlaceholder from "@/components/shared/AccountsTablePlaceholder";

const AddAddress = ({ user, setUser, address, setAddress, sarabun }) => {
  const customerData = user || null;
  const router = useRouter();
  const query = router.query;
  const [addressDetail, setAddressDetails] = useState();

  // const [address, setAddress] = useState(false);
  const [changeAddress, setChangeAddress] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [onConfirm, setOnconfirm] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [btnClick, setBtnClick] = useState(false);
  const [billingId, setBillingId] = useState("");
  const [shippingId, setShippingId] = useState("");

  const manageAddresses = () => {
    setAddress(true);
    setChangeAddress(false)
  };

  useEffect(() => {
    if (query.changeBilling) {
      setBillingId(parseInt(customerData.data.customer.default_billing));
      setAddress(true);
      setChangeAddress(true)
    }
  }, [query.changeBilling]);

  useEffect(() => {
    if (query.changeShipping) {
      setShippingId(parseInt(customerData.data.customer.default_shipping));
      setAddress(true);
      setChangeAddress(true)
    }
  }, [query.changeShipping]);

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;

  const addressRecords = dlv(customerData, "data.customer.addresses") || [];
  const slicedRecords = addressRecords.slice(firstIndex, lastIndex);
  const customerAddress = slicedRecords ? slicedRecords.reverse() : [];
  const totalPages = Math.ceil((addressRecords.length || 0) / recordsPerPage);

  const setPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleEditAddress = (customerAddress) => {
    setAddressDetails(customerAddress);
    setChangeAddress(true);
    setAddress(true);
  };

  const handleDeleteAddress = async (id) => {
    setBtnClick(true);
    setDeleteId(id);
    setOpenModal(true);
    if (onConfirm) {
      if (customerData) {
        const { addresses, ...rest } = customerData.data.customer;

        const updatedCustomer = {
          ...rest,
          addresses,
        };
        await deleteAddress(id).then(async (res) => {
          if (res.status === "200") {
            setOpenModal(false);
            const fetchedCustomer = await customer(updatedCustomer);
            setUser(fetchedCustomer);
            setResponseMessage(res.message);
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            setResponseMessage(errors[0].message);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (onConfirm && btnClick && deleteId) {
      handleDeleteAddress(deleteId).then(() => {
        setOnconfirm(false);
        setBtnClick(false);
        setDeleteId(null);
      });
    }
  }, [onConfirm]);

  return (
    <>
      <div className="py-4 flex-1 md:p-4 lg:p-8 account-right-col">
        <h2 className={`text-lg md:text-2xl xl:text-3xl text-titleColor font-semibold mb-4 lg:mb-8 after:'' after:w-[2em] after:h-[2px] after:bg-primaryColor after:block after:mt-1 ${sarabun}`}>
          Address Book
        </h2>
        {!address ? (
          <>
            <p className="text-green-600 my-6">{responseMessage}</p>
            <section className="pb-8 mb-8">
              <h2 className={`text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium mb-4 lg:mb-6 flex items-end flex-wrap gap-3 ${sarabun}`}>
                Address Book
                <button
                  onClick={manageAddresses}
                  className="text-sm md:text-base text-primaryColor duration-150 hover:underline"
                >
                  Manage Addresses
                </button>
              </h2>
              {dlv(customerData, "data.customer.addresses")? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 divide-y divide-textColor">
                  {/* First Column */}
                  <div className="w-full shadow-[0_0_10px_0_rgb(0,0,0,0.10)] rounded-lg p-6">
                    <div className="space-y-4">
                      <h4 className={`text-gray-800 text-base sm:text-lg xl:text-xl font-medium ${sarabun}`}>
                        Default Billing Address
                      </h4>
                      {dlv(customerData, "data.customer.addresses") &&
                        dlv(customerData, "data.customer.addresses").map(
                          (address) => {
                            if (
                              parseInt(
                                customerData.data.customer.default_billing
                              ) === parseInt(address.id)
                            ) {
                              return (
                                <div className="space-y-2">
                                  <p className="text-base text-textColor">
                                    {address.firstname} {address.lastname}
                                  </p>
                                  {address.company !== 'null' ? <p className="text-base text-textColor">
                                    {address.company}
                                  </p> : ''}
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
                                      <button
                                        className="text-base text-primaryColor duration-150 hover:underline"
                                        onClick={() =>
                                          handleEditAddress(address)
                                        }
                                      >
                                        Change Billing Address
                                      </button>
                                    </div>
                                  </ul>
                                </div>
                              );
                            }
                            return null; // If no default billing address matches
                          }
                        )}
                      {dlv(customerData, "data.customer.addresses") &&
                        !dlv(customerData, "data.customer.addresses").some(
                          (address) =>
                            parseInt(
                              customerData.data.customer.default_billing
                            ) == parseInt(address.id)
                        ) && (
                          <p className="text-base text-textColor">
                            No Default Billing Address
                          </p>
                        )}
                    </div>
                  </div>

                  {/* Second Column */}
                  <div className="w-full shadow-[0_0_10px_0_rgb(0,0,0,0.10)] rounded-lg p-6 hidden">
                    <div className="space-y-4">
                      <h4 className={`text-gray-800 text-base sm:text-lg xl:text-xl font-medium ${sarabun}`}>
                        Default Shipping Address
                      </h4>
                      {dlv(customerData, "data.customer.addresses") &&
                        dlv(customerData, "data.customer.addresses").map(
                          (address) => {
                            if (
                              parseInt(
                                customerData.data.customer.default_shipping
                              ) === parseInt(address.id)
                            ) {
                              return (
                                <div className="space-y-2">
                                  <p className="text-base text-textColor">
                                    {address.firstname} {address.lastname}
                                  </p>
                                  {address.company !== 'null' ? <p className="text-base text-textColor">
                                    {address.company}
                                  </p> : ''}
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
                                      <button
                                        className="text-base text-primaryColor duration-150 hover:underline"
                                        onClick={() =>
                                          handleEditAddress(address)
                                        }
                                      >
                                        Change Shipping Address
                                      </button>
                                    </div>
                                  </ul>
                                </div>
                              );
                            }
                            return null; // If no default shipping address matches
                          }
                        )}
                      {dlv(customerData, "data.customer.addresses") &&
                        !dlv(customerData, "data.customer.addresses").some(
                          (address) =>
                            parseInt(
                              customerData.data.customer.default_shipping
                            ) === parseInt(address.id)
                        ) && (
                          <p className="text-base text-textColor">
                            No Default Shipping Address
                          </p>
                        )}
                    </div>
                  </div>
                </div>
              ) : (
                <AccountAddressPlaceholder />
              )}
            </section>

            <div>
              {dlv(customerData, "data.customer.addresses.length") >= 1 && <h2 className={`text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium mb-4 lg:mb-6 flex items-end flex-wrap gap-3 ${sarabun}`}>
                Address List
              </h2>}
              {dlv(customerData, "data.customer.addresses") ? (
                dlv(customerData, "data.customer.addresses.length") >= 1 &&
                ((address) =>
                  address.id !==
                    parseInt(
                      dlv(customerData, "data.customer.default_billing")
                    )) ? (
                  <div className="overflow-x-auto">
                    <table className="">
                      <thead className="">
                        <tr className="bg-[#FFF7F2]">
                          <th className="min-w-[10rem] text-lg text-titleColor font-medium items-center p-3">
                            First Name
                          </th>
                          <th className="min-w-[10rem] text-lg text-titleColor font-medium items-center p-3">
                            Last Name
                          </th>
                          <th className="min-w-[10rem] text-lg text-titleColor font-medium items-center p-3">
                            Street Address
                          </th>
                          <th className="min-w-[10rem] text-lg text-titleColor font-medium items-center p-3">
                            City
                          </th>
                          <th className="min-w-[10rem] text-lg text-titleColor font-medium items-center p-3">
                            Country
                          </th>
                          <th className="min-w-[10rem] text-lg text-titleColor font-medium items-center p-3">
                            State
                          </th>
                          <th className="min-w-[10rem] text-lg text-titleColor font-medium items-center p-3">
                            Zip Code
                          </th>
                          <th className="min-w-[10rem] text-lg text-titleColor font-medium items-center p-3">
                            Phone Number
                          </th>
                          <th className="min-w-[10rem] text-lg text-titleColor font-medium items-center p-3">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerAddress.map(
                          (address) =>
                           
                            address.id !==
                              parseInt(
                                customerData.data.customer.default_billing
                              ) && (
                              <tr className="border-solid border-b border-[#E4E4E4] pb-4 mb-4">
                                <td
                                  data-th="Order #"
                                  className="text-base md:text-lg p-3 text-center"
                                >
                                  {dlv(address, "firstname")}
                                </td>
                                <td
                                  data-th="Date"
                                  className="text-md p-3 text-center grid"
                                >
                                  {dlv(address, "lastname")}
                                </td>
                                <td
                                  data-th="Order Total"
                                  className="text-md p-3 text-center"
                                >
                                  {dlv(address, "street")}
                                </td>
                                <td
                                  data-th="Status"
                                  className="text-md p-3 text-center"
                                >
                                  {dlv(address, "city")}
                                </td>
                                <td className="text-md md:text-base p-3 text-center">
                                  {dlv(address, "country_code")}
                                </td>
                                <td className="text-md p-3 text-center">
                                  {dlv(address, "region.region")}
                                </td>
                                <td className="text-md p-3 text-center">
                                  {dlv(address, "postcode")}
                                </td>
                                <td className="text-md md:text-base p-3 text-center">
                                  {dlv(address, "telephone")}
                                </td>
                                <td className="text-md md:text-base p-3 text-center">
                                  <Link
                                    href={""}
                                    onClick={() => {
                                      setChangeAddress(true);
                                      setAddressDetails(address);
                                      setAddress(true);
                                    }}
                                  >
                                    Edit
                                  </Link>{" "}
                                  |{" "}
                                  <Link
                                    href={""}
                                    onClick={() => {
                                      handleDeleteAddress(address.id);
                                    }}
                                  >
                                    Delete
                                  </Link>
                                </td>
                              </tr>
                            )
                        )}
                      </tbody>
                    </table>
                    {totalPages > 1 && (
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setPageChange}
                      />
                    )}
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <AccountsTablePlaceholder />
              )}
            </div>
          </>
        ) : (
          <AddressForm
            addressForm={address}
            setAddressForm={setAddress}
            address={addressDetail}
            user={customerData}
            changeAddress={changeAddress}
            setChangeAddress={setChangeAddress}
            setUser={setUser}
            billingId={billingId}
            shippingId={shippingId}
            sarabun={sarabun}
          />
        )}

        <Modal
          openModal={openModal}
          setOpenModal={setOpenModal}
          setOnconfirm={setOnconfirm}
        />
      </div>
    </>
  );
};

export default AddAddress;
