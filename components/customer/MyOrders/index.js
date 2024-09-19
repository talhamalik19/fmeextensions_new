import { getOrderProducts, getOrders, reOrders } from "@/pages/api/order";
import { getCookie } from "cookies-next";
import dlv from "dlv";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/shared/Pagination";
import { useRouter } from "next/router";
import LoadingAnimation from "@/components/shared/LoadingAnimation";
import AccountsTablePlaceholder from "@/components/shared/AccountsTablePlaceholder";

export default function MyOrders({
  user,
  manageOrderState,
  orderProducts,
  productStatus,
  customerData, sarabun
}) {
  const router = useRouter()
  const customer = user || null;
  const selected_currency = getCookie("currency_code");

  // Pagination Variables

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const [currencySymbol, setCurrencySymbol] = useState('')

  const records = (dlv(customer, "data.customerOrders.items")) || [];
  const slicedRecords = records.slice().reverse().slice(firstIndex, lastIndex);
  const customerOrder = slicedRecords ? slicedRecords : [];
  const totalPages = Math.ceil((records.length || 0) / recordsPerPage);

  //Pagination Method
  const setPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(()=>{
    const symbol = getCookie('symbol_currency') || '';
        setCurrencySymbol(symbol)
  }, [])

  // const formatCurrency = (currency, value) => {
  //   return new Intl.NumberFormat("en-US", {
  //     style: "currency",
  //     currency: currency,
  //   }).format(value);
  // };

  //Method that will save reorder items
  const reOrder = async (order_number) => {
    await reOrders(order_number);
    router.push("/cart");
  };

  return (
    <>
    <div className="py-4 flex-1 md:p-4 lg:p-8 account-right-col">
     <h2 className={`text-lg md:text-2xl xl:text-3xl text-titleColor font-semibold mb-4 lg:mb-8 after:'' after:w-[2em] after:h-[2px] after:bg-primaryColor after:block after:mt-1 ${sarabun}`}>
                My Orders
              </h2>
    {dlv(customer, "data.customerOrders.items")?
      <section className="">
        {dlv(customer, "data.customerOrders.items.length") &&
          dlv(customer, "data.customerOrders.items.length") !== 0 ? (
          <>
                <div className="overflow-x-auto">
                  <table className="w-full min-width-[800px] whitespace-nowrap">
                    <thead className="">
                      <tr className="bg-[#FFF7F2]">
                        <th className="text-lg text-titleColor font-medium items-center p-3">
                          Order #
                        </th>
                        <th className="text-lg text-titleColor font-medium items-center p-3">
                          Date
                        </th>
                        <th className="text-lg text-titleColor font-medium items-center p-3">
                          Order Total
                        </th>
                        <th className="text-lg text-titleColor font-medium items-center p-3">
                          Status
                        </th>
                        <th className="text-lg text-titleColor font-medium items-center p-3">
                          Downloadable Products
                        </th>
                        <th className="text-lg text-titleColor font-medium items-center p-3">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="w-full">
                      {customerOrder.map((myOrders) => (<>
                        <tr className="border-solid border-b border-[#E4E4E4] pb-4 mb-4">
                          <td
                            data-th="Order #"
                            className="text-base p-3 text-center"
                          > {dlv(myOrders, "order_number")}
                          </td>
                          <td
                            data-th="Date"
                            className="text-md p-3 text-center grid"
                          >
                            {new Date(dlv(myOrders, "created_at")).toLocaleDateString("en-us", {
                              year: "numeric",
                              month: "numeric",
                              day: "2-digit",
                            })}
                          </td>
                          <td
                            data-th="Order Total"
                            className="text-md p-3 text-center"
                          >
                            {" "}
                            {currencySymbol}{dlv(myOrders, "grand_total")}
                            {/* {dlv(myOrders, "grand_total").toFixed(2)} */}
                          </td>
                          <td
                            data-th="Status"
                            className="text-md p-3 text-center"
                          >
                            {dlv(myOrders, "status")}
                          </td>
                          <td
                            data-th="Status"
                            className="text-md p-3 text-center"
                          >
                            <Link
                              className="loading_action text-md text-primaryColor hover:underline transition-all"
                              href={`/downloadable/${dlv(myOrders, "order_number")}`}>
                                View Downloadable
                              </Link>
                          </td>
                          <td className="text-md p-3 text-center">
                            <Link
                              className="loading_action text-md text-primaryColor hover:underline transition-all"
                              // onClick={() =>
                              //   getMyOrder(dlv(myOrders, "order_number"))
                              // }
                              href={`/sales/order/view/order_id/${dlv(myOrders, "order_number")}`}
                            >
                              View Order
                            </Link>
                            <span className="inline-block px-2">|</span>
                            <button
                              onClick={() =>
                                reOrder(dlv(myOrders, "order_number"))
                              }
                              className="btn-cart loading_action text-md text-primaryColor hover:underline transition-all"
                            >
                              ReOrder
                            </button>
                          </td>
                        </tr>
                        </>
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
            ) : <p>No order placed</p> }
      </section>
      :
      <AccountsTablePlaceholder/>}
      </div>
      </>
  );
}
