import dlv from "dlv";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/shared/Pagination";
import {customer} from "@/pages/api/login";
import AccountsTablePlaceholder from "@/components/shared/AccountsTablePlaceholder";
import { setCookie, deleteCookie, getCookie } from "cookies-next";
import { getStrapiURL } from "@/utils";
import LoadingAnimation from "@/components/shared/LoadingAnimation";

export default function DownloadableProducts({
  setUser, order_id, customerData, sarabun}) {
  // Pagination Variables
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const [records, setRecords] = useState(dlv(customerData, "data.customerDownloadableProducts.items").filter((downloadable)=>(parseInt(downloadable.order_increment_id) === parseInt(order_id))) || [] );
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const slicedRecords = records.slice().reverse().slice(firstIndex, lastIndex);
  const downloadable = slicedRecords ? slicedRecords : [];
  const totalPages = Math.ceil((records.length || 0) / recordsPerPage);
  const [jwtToken, setJwtToken] = useState(null);
 
  const [loadingStates, setLoadingStates] = useState(
    downloadable.map(() => false)
  );

  // Function to update loading state for a specific index
  const updateLoadingState = (index, value) => {
    setLoadingStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = value;
      return newStates;
    });
  };

  //Pagination Method
  const setPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleLinkClick = async (download_url, index, title) => {
    updateLoadingState(index, true);

    try {
      const url = download_url.split('id/');
    const encodedString = url[1].replace('/','');
    const decodedString = decodeURIComponent(encodedString);

    const response = await fetch(getStrapiURL('/graphql'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({
        query: `
        {
          getDownloadableFile(linkId: "${decodedString}") {
            fileContent,
            fileExtension
          }
        }        
        `,
        variables: {},
      }),
    });

    const data = await response.json();
    const file = data.data.getDownloadableFile[0];
    // Decode the base64 string
    const decodedData = atob(file.fileContent);

    // Convert the decoded data to a Uint8Array
    const uint8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uint8Array[i] = decodedData.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([uint8Array], { type: 'application/octet-stream' });

    // Create a download link and trigger a download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${title}.${file.fileExtension}`; // Set the desired file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    } catch (error) {
      // Handle error if needed
    } finally {
      updateLoadingState(index, false);
    }
  };

  useEffect(()=>{
  const jwt = getCookie("jwt");
  setJwtToken(jwt);
   setRecords( dlv(customerData, "data.customerDownloadableProducts.items").filter((downloadable)=>(parseInt(downloadable.order_increment_id) === parseInt(order_id))) )
  }, [customerData])

  useEffect(()=>{
    async function update(){
       const {customerDownloadableProducts, ...rest} = customerData.data
       const updatedCustomer = {
         ...rest,
         customerDownloadableProducts
       }
       const fetchedDownloadableCustomer = await customer(updatedCustomer);
       setUser(fetchedDownloadableCustomer)
 
     }
     update()
     return () => {};
   }, [])

  return (
    <>
     <div className="py-4 flex-1 md:p-4 lg:p-8 account-right-col">
     <h2 className={`text-lg md:text-2xl xl:text-3xl text-titleColor font-semibold mb-4 lg:mb-8 after:'' after:w-[2em] after:h-[2px] after:bg-primaryColor after:block after:mt-1 ${sarabun}`}>
                Downloadable Products
              </h2>
      <section className="pb-8 mb-8">
        {dlv(customerData, "data.customerDownloadableProducts.items.length") &&
        dlv(customerData, "data.customerDownloadableProducts.items.length") >
          0 ? (
          <>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] whitespace-nowrap">
              <thead className="">
                <tr className="bg-[#FFF7F2]">
                  <th className="text-lg text-titleColor font-medium items-center p-3">
                    Order #
                  </th>
                  <th className="text-lg text-titleColor font-medium items-center p-3">
                    Date
                  </th>
                  <th className="text-lg text-titleColor font-medium items-center p-3">
                    Title
                  </th>
                  <th className="text-lg text-titleColor font-medium items-center p-3">
                    Status
                  </th>
                  <th className="text-lg text-titleColor font-medium items-center p-3">
                    Remaining Downloads
                  </th>
                </tr>
              </thead>
              <tbody>
              {downloadable.map((downloadableProduct, index) => (
                      downloadableProduct.remaining_downloads !=='0' &&
                  <tr className="border-solid border-b border-[#E4E4E4] pb-4 mb-4">
                    <td
                      data-th="Order #"
                      className="text-base p-3 text-center"
                    >
                      <Link
                        href={`/sales/order/view/order_id/${dlv(downloadableProduct, "order_increment_id")}`}
                        className="text-primaryColor hover:underline transition-all"
                      >
                        {dlv(downloadableProduct, "order_increment_id")}
                      </Link>
                    </td>
                    <td
                      data-th="Date"
                      className="text-md p-3 text-center"
                    >
                      {new Date(dlv(downloadableProduct, "date")).toLocaleDateString("en-us", {
                      year: "numeric",
                      month: "numeric",
                      day: "2-digit",
                    })}
                    </td>
                    <td
                      data-th="Title"
                      className="text-md p-3 text-center"
                    >
                     {/*  <Link href={`${dlv(downloadableProduct, "download_url")}/token/${jwtToken}`} target="_blank">
                      {dlv(downloadableProduct, "title")}
                      </Link> */}
                            <button
                    className="text-primaryColor hover:underline transition-all"
                    onClick={() => handleLinkClick(dlv(downloadableProduct, "download_url"), index, dlv(downloadableProduct, "title"))}
                  >
                    {dlv(downloadableProduct, "title")} <LoadingAnimation isLoading={loadingStates[index]} />
                  </button>
                    </td>
                    <td
                      data-th="Status"
                      className="text-md md:text-base p-3 text-center"
                    >
                      {dlv(downloadableProduct, "status")}
                    </td>
                    <td
                      data-th="Remaining Downloads"
                      className="text-md md:text-base p-3 text-center"
                    >
                      {dlv(downloadableProduct, "remaining_downloads")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPageChange}
              />
            )}
          </>
        ) : <AccountsTablePlaceholder/>}
      </section>
      
    </div>
    </>
  );
}
