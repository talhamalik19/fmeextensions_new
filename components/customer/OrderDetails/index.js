import React, { useEffect, useRef, useState } from "react";
import dlv from "dlv";
import { getOrders } from "@/pages/api/order";
import { reOrders } from "@/pages/api/order";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import OrderDetailsPlaceholder from "@/components/shared/OrderDetailsPlaceholder";
import { getStrapiURL } from "@/utils";
import LoadingAnimation from "@/components/shared/LoadingAnimation";
// import html2pdf from "html2pdf.js";


export default function OrderDetails({
  user,
  setUser,
  order_id,
  customerData,
  sarabun
}) {
  const deskLogo = "/images/webp/logo.webp";
  const router = useRouter()
  const currency_code = getCookie('currency_code')
  const currentOrderId = order_id;
  const [productStatus, setProductStatus] = useState({});
  const [orderProducts, setOrderProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const selected_currency = getCookie("currency_code");
  const [jwtToken, setJwtToken] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState('')

  const date = new Date(dlv(productStatus, "created_at"));

  try {
    useEffect(()=>{
      const jwt = getCookie("jwt");
    setJwtToken(jwt);
      const symbol = getCookie('symbol_currency') || '$';
          setCurrencySymbol(symbol)
    }, [])
    
  } catch (error) {
    console.log(error)
  }

  const formatCurrency = (currency, value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  const getOrderNumberById = (id) => {
    const mapping = {};
    dlv(customerData, 'data.customerOrders.items', []).forEach(item => {
      mapping[item.order_number] = item.id;
    });
    return mapping[id];
  };

  const handleDownload = async () => {
    const id = getOrderNumberById(order_id);
    setIsLoading(true);

    try {
        const response = await fetch(getStrapiURL('/graphql'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
                query: `
                    {
                        generateInvoice(orderNumber: "${id}") {
                            pdf
                            error
                        }
                    }      
                `,
                variables: {},
            }),
        });

        const data = await response.json();
        console.log(data)
        const file = data.data.generateInvoice.pdf;
        
        // Decode the Base64 string directly to Uint8Array
        const uint8Array = Uint8Array.from(atob(file), c => c.charCodeAt(0));

        // Asynchronously create Blob
        const blob = await new Promise((resolve) => {
            resolve(new Blob([uint8Array], { type: 'application/octet-stream' }));
        });

        function getCurrentDate() {
          const now = new Date();
          const year = now.getFullYear();
          const month = now.getMonth() + 1; // Month is zero-based, so we add 1
          const day = now.getDate();
      
          // Format the date as YYYY-MM-DD
          const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
          
          return formattedDate;
      }

        // Create a download link and trigger a download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${order_id}_${getCurrentDate()}.pdf`; // Set the desired file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
      console.log(error)
        // Handle error if needed
    } finally {
        setIsLoading(false);
    }
};

  //Method that will save reorder items
  const reOrder = async (order_number) => {
    await reOrders(order_number);
    router.push("/cart");
  };

  const getMyOrder = async (orderId) => {
    setIsLoading(true);

    setOrderProducts(await getOrders(orderId, currency_code));
    let order_items_skus = [];

    if (dlv(orderProducts, "data.customer.orders.items")) {
      order_items_skus = dlv(orderProducts, "data.customer.orders.items")
        .map((order_item) => {
          return dlv(order_item, "items", [])
            .map((item) => {
              const product_sku = dlv(item, "product_sku");
              return product_sku;
            })
            .flat(); // Use the flat() method to flatten the inner arrays
        })
        .flat(); // Use the flat() method to flatten the outer array
    }
    const skusArray = order_items_skus.map((sku) => `"${sku}"`); // Wrap each SKU in double quotes
    const skusString = `[${skusArray.join(", ")}]`; // Create a JSON array string
    /* const order_items = await getOrderProducts(skusString); */
    setProductStatus(
      customerData.data.customerOrders.items.find(
        (value) => value.order_number === orderId
      )
    );
    // setManageOrderState(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (currentOrderId) {
      getMyOrder(currentOrderId);
    }
  }, [currentOrderId]);

  const orderDetailsRef = useRef(null);
  const addressRef = useRef(null);

  const handlePrint = () => {
    const customElement = `<div style="margin: 20px"><img src=${deskLogo}/></div>`;
    const orderDetailsContent = orderDetailsRef.current.outerHTML;
    const addressContent = addressRef.current.outerHTML;

    const combinedContent = `
      <html>
        <head>
          <title>Invoice</title>
          <style>
          @media all{
            #orderdetails, #address {
              margin: 20px;
              max-width:1400px;
              margin:auto;
            }
            #order-btn{
              display: none;
            }
            #order-table{
              min-width: 0px;
              width:100%;
            }
            #order-info{
              display: flex;
              justify-content: space-between;
            }
            #payment{
              background-color: #D3D3D3;
              text-align: right;
              padding: 20px
            }
            #mytable{
              text-align: left;
            }
          }
          </style>
        </head>
        <body>
        ${customElement}
          ${orderDetailsContent}
          ${addressContent}
        </body>
      </html>
    `;

    if (typeof window !== "undefined") {
      const printWindow = window.open("", "_blank");
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print</title>
          </head>
          <body>
            ${combinedContent}
          </body>
        </html>
      `);
      printWindow.document.close();
    
      // Initiate the printing process for the content in the new window or hidden element
      printWindow.onload = () => {
        printWindow.print();
        printWindow.close(); // Optionally close the new window after printing
      };
     
    }
  };

  return (
    <div className="py-4 flex-1 md:p-4 lg:p-8 account-right-col">
      <h2 className={`text-lg md:text-2xl xl:text-3xl text-titleColor font-semibold mb-4 lg:mb-8 after:'' after:w-[2em] after:h-[2px] after:bg-primaryColor after:block after:mt-1 ${sarabun}`}>
        My Orders
      </h2>
      {dlv(orderProducts, "data.customer") && dlv(orderProducts, "data.customer.orders.items.length") >0 ? (<>
      <section className="pb-8 mb-8" id="orderdetails" ref={orderDetailsRef}>
        <p className="text-[20px] font-normal pb-4">Order # {currentOrderId}</p>
        <p className="text-[16px] font-normal pb-4 uppercase">
          {dlv(productStatus, "status")}
        </p>
        <p className="text-[16px] font-normal pb-4">
          {date.toLocaleDateString("en-us", {
            year: "numeric",
            month: "long",
            day: "2-digit",
          })}
        </p>
        <div className="flex flex-col sm:flex-row justify-between pb-8" id="order-btn">
          <button
            onClick={() => reOrder(currentOrderId)}
            className="text-primaryColor hover:underline transition-all mb-4 sm:mb-0"
          >
            Reorder
          </button>

          {/* <Link
            href={`/sales/order/print/order_id/${currentOrderId}`}
            target="_blank"
            className="text-primaryColor hover:underline transition-all"
          >
            Print Order
          </Link> */}
          <button className="text-primaryColor m_address" onClick={handleDownload}>Download Invoice</button>
        </div>
        <div className="overflow-x-auto">
          
          <table className="w-full  min-w-[800px]" id="order-table">
            <thead>
              <tr className="bg-[#FFF7F2]" id="mytable">
                <th className="text-lg text-titleColor font-medium items-center p-3">
                  Product Name
                </th>
                <th className="text-lg text-titleColor font-medium items-center p-3">
                  SKU
                </th>
                <th className="text-lg text-titleColor font-medium items-center p-3">
                  Price
                </th>
                <th className="text-lg text-titleColor font-medium items-center p-3">
                  Qty
                </th>
                <th className="text-lg text-titleColor font-medium items-center p-3">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {
                dlv(orderProducts, "data.customer.orders.items").map(
                  (myOrders) => {
                    return dlv(myOrders, "items").map((product) => {
                      return (
                        <>
                          <tr className="border-solid border-b border-[#E4E4E4] pb-4 mb-4">
                            <td
                              data-th="Order #"
                              className="text-md p-3 text-center"
                            >
                              {dlv(product, "product_name")}
                            </td>
                            <td
                              data-th="Date"
                              className="text-md p-3 text-center grid"
                            >
                              {dlv(product, "product_sku")}
                            </td>
                            <td
                              data-th="Order Total"
                              className="text-md p-3 text-center font-medium"
                            >
                              {currencySymbol}{
                                dlv(product, "product_sale_price.value")
                              }
                            </td>
                            <td
                              data-th="Status"
                              className="text-md p-3 text-center"
                            >
                              Ordered: {dlv(product, "quantity_ordered")}
                            </td>
                            <td className="text-md p-3 text-center font-medium">
                            {currencySymbol}{ dlv(product, "quantity_ordered") *
                                  dlv(product, "product_sale_price.value")}
                            </td>
                          </tr>
                        </>
                      );
                    });
                  }
                )}
            </tbody>
          </table>
          
        </div>
        <div className="p-[20px] text-right w-full border-1 border-green-100 border-solid bg-gray-100" id="payment">
          {dlv(orderProducts, "data") &&
            dlv(orderProducts, "data.customer.orders.items").map((myOrders) => {
              return (
                <>
                  {myOrders.total.discounts.length === 0 ? (
                    <>
                      <p className="py-[15px]">
                        <span className="p-4">Subtotal: </span>
                        {currencySymbol}{productStatus.grand_total}
                      </p>
                      <p className="py-[15px] font-medium text-lg">
                        {" "}
                        <span className="text-[18px] p-4">Grand Total: </span>
                        {currencySymbol}{productStatus.grand_total}
                      </p>
                    </>
                  ) : (
                    myOrders.total.discounts.map((el) => (
                      <>
                        <p className="py-[15px]">
                          {" "}
                          <span className=" p-4">Subtotal: </span>
                          {currencySymbol}{el.amount.value + productStatus.grand_total}
                        </p>
                        <p className="py-[15px]">
                          {" "}
                          <span className=" p-4">Discount: </span>-
                          {currencySymbol}{el.amount.value}
                        </p>
                        <p className="py-[15px] font-medium text-lg">
                          {" "}
                          <span className="text-[18px] p-4">Grand Total:</span>
                          {currencySymbol} {
                            productStatus.grand_total
                          }
                        </p>
                      </>
                    ))
                  )}
                </>
              );
            })}
        </div>
      </section>
      <section className="" ref={addressRef} id="address">
        <h2 className="text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium mb-6 flex items-end flex-wrap gap-3">
          Order Information
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 divide-y divide-textColor" id="order-info">
          {/* First Column */}
          <div className="w-full shadow-[0_0_10px_0_rgb(0,0,0,0.10)] rounded-lg p-6">
            <div className="space-y-4">
              <h4 className="text-gray-800 text-base sm:text-lg xl:text-xl font-medium">
                Default Billing Address
              </h4>
              {dlv(customerData, "data.customer.addresses") &&
                dlv(customerData, "data.customer.addresses").map(
                  (address, index) => {
                    if (
                      customerData.data.customer.default_billing == address.id
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
                        </div>
                      );
                    }
                  }
                )}
            </div>
          </div>
          <LoadingAnimation isLoading={isLoading} />
          {/* Second Column */}
          {/* <div className="w-full shadow-[0_0_10px_0_rgb(0,0,0,0.10)] rounded-lg p-6">
            <div className="space-y-4">
              <h4 className="text-gray-800 text-base sm:text-lg xl:text-xl font-medium">
                Payment Method
              </h4>
              <div className="space-y-2">
                <p className="text-base text-textColor">
                  Payment Method Goes Here
                </p>
              </div>
            </div>
          </div> */}
        </div>
      </section>
      
      </>) : <OrderDetailsPlaceholder/>}
    </div>
  );
}
