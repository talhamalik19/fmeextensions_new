import React, { useEffect, useRef } from "react";
import dlv from "dlv";
import OrderDetailsPlaceholder from "@/components/shared/OrderDetailsPlaceholder";

export default function OrderPrint({
  order_id,
  customerData,
  customerOrders,
  selected_currency
}) {
  const currentOrderId = order_id;
  const productStatus = customerData.data.customerOrders.items.find(
    (value) => value.order_number === order_id
  );
  const contentRef = useRef(null);
  const deskLogo = "/images/webp/logo.webp";

  const date = new Date(dlv(productStatus, "created_at"));

  const formatCurrency = (currency, value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: selected_currency,
    }).format(value);
  };

  useEffect(() => {
    handlePrint();
  }, [currentOrderId]);


  const handlePrint = () => {
    document.title = `Order # ${currentOrderId}`;
    window.print();
  };

  const emailStyle = {
    backgroundColor: '#fff',
    margin: 0,
    padding: 0,
    lineHeight: '20px',
    fontFamily: 'Arial',
    fontSize: '12px',
    fontWeight: 'normal',
    color: '#333333',
  };

  const tableStyle = {
    width: '95%',
    border: '0',
    margin: '0 auto 10px',
  };

  const containerStyle = {
    position: 'relative',
    border: '#cfcfcf 1px solid',
    padding: '12px 12px',
  };

  const headingStyle = {
    fontSize: '22px',
    fontWeight: 'normal',
    lineHeight: '22px',
    margin: '0 0 11px 0',
  };

  const paragraphStyle = {
    fontSize: '12px',
    lineHeight: '20px',
    margin: '0',
  };

  const linkStyle = {
    color: '#DC4E2D',
  };

  return (
    dlv(customerOrders, "data.customer") && dlv(customerOrders, "data.customer.orders.items.length") > 0 && <div className="" style={{ padding: '10px 0px' }} ref={contentRef}>
      <section style={emailStyle}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td align="center" valign="top" style={containerStyle}>
                <table bgcolor="FFFFFF" cellSpacing="0" cellPadding="10" border="0" width="100%" >
                  <tbody>
                    <tr>
                      <td align="left" valign="top" style={{ borderBottom: '#cfcfcf 1px solid', padding: '0px 10px' }}>
                        <table>
                          <tbody>
                            <tr>
                              <td style={{ paddingRight: '20px' }}>
                                <p >
                                  <img src="/images/webp/responsive_logo.webp?w=640&q=100" alt="FME" width={100} height={50} />
                                </p>
                              </td>
                              <td valign="middle" align="left" style={{ ...paragraphStyle, fontSize: '18px', fontWeight: 'bold', color: '#DC4E2D', verticalAlign: 'middle' }}>
                                FME Magento Extensions and Themes: Invoice # {currentOrderId}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td valign="top" style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '20px' }}>
                        <h1 style={headingStyle}>{`${dlv(customerData, 'data.customer.firstname')} ${dlv(customerData, 'data.customer.lastname')}`}</h1>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '10px' }}>
                        <h2 style={{ ...headingStyle, fontSize: '18px' }}>
                          Order # {currentOrderId} <small style={{ fontSize: '15px' }}>(placed on {date.toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                          })})</small>
                        </h2>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <table style={{ width: '100%' }}>
                          <tbody>
                            <tr>
                              <td style={{ padding: '20px 0px' }}>
                                <table className="w-full  min-w-[800px]">
                                  <thead>
                                    <tr className="bg-[#FFF7F2]">
                                      <th className="" style={{ fontSize: '14px', color: '#333', fontWeight: '700', padding: '10px' }}>
                                        Product Name
                                      </th>
                                      <th style={{ fontSize: '14px', color: '#333', fontWeight: '700', padding: '10px' }}>
                                        SKU
                                      </th>
                                      <th style={{ fontSize: '14px', color: '#333', fontWeight: '700', padding: '10px' }}>
                                        Price
                                      </th>
                                      <th style={{ fontSize: '14px', color: '#333', fontWeight: '700', padding: '10px' }}>
                                        Qty
                                      </th>
                                      <th style={{ fontSize: '14px', color: '#333', fontWeight: '700', padding: '10px' }}>
                                        Subtotal
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {
                                      dlv(customerOrders, "data.customer.orders.items").map(
                                        (myOrders) => {
                                          return dlv(myOrders, "items").map((product) => {
                                            return (
                                              <>
                                                <tr className="border-solid border-b border-[#E4E4E4] pb-4 mb-4">
                                                  <td
                                                    data-th="Order #"
                                                    style={{ fontSize: '12px', color: '#333', padding: '10px', textAlign: 'center' }}
                                                  >
                                                    {dlv(product, "product_name")}
                                                  </td>
                                                  <td
                                                    data-th="Date"
                                                    style={{ fontSize: '12px', color: '#333', padding: '10px', textAlign: 'center' }}
                                                  >
                                                    {dlv(product, "product_sku")}
                                                  </td>
                                                  <td
                                                    data-th="Order Total"
                                                    style={{ fontSize: '12px', color: '#333', padding: '10px', textAlign: 'center' }}
                                                  >
                                                    {formatCurrency(
                                                      selected_currency,
                                                      dlv(product, "product_sale_price.value")
                                                    )}
                                                  </td>
                                                  <td
                                                    data-th="Status"
                                                    style={{ fontSize: '12px', color: '#333', padding: '10px', textAlign: 'center' }}
                                                  >
                                                    Ordered: {dlv(product, "quantity_ordered")}
                                                  </td>
                                                  <td style={{ fontSize: '12px', color: '#333', padding: '10px', textAlign: 'center' }}>
                                                    {formatCurrency(
                                                      selected_currency,
                                                      dlv(product, "quantity_ordered") *
                                                      dlv(product, "product_sale_price.value")
                                                    )}
                                                  </td>
                                                </tr>
                                              </>
                                            );
                                          });
                                        }
                                      )}
                                  </tbody>
                                </table>
                                <div className="p-[20px] text-right w-full border-1 border-green-100 border-solid bg-gray-100">
                                  {dlv(customerOrders, "data") &&
                                    dlv(customerOrders, "data.customer.orders.items").map((myOrders) => {
                                      return (
                                        <>
                                          {myOrders.total.discounts.length === 0 ? (
                                            <>
                                              <p style={{ fontSize: '12px', color: '#333', padding: '10px' }}>
                                                <span style={{ fontSize: '14px', fontWeight: '500', paddingRight: '10px' }}>Subtotal: </span>
                                                {formatCurrency(
                                                  selected_currency,
                                                  productStatus.grand_total
                                                )}
                                              </p>
                                              <p style={{ fontSize: '12px', color: '#333', padding: '10px' }}>
                                                {" "}
                                                <span style={{ fontSize: '14px', fontWeight: '500', paddingRight: '10px' }}>Grand Total: </span>
                                                {formatCurrency(
                                                  selected_currency,
                                                  productStatus.grand_total
                                                )}
                                              </p>
                                            </>
                                          ) : (
                                            myOrders.total.discounts.map((el) => (
                                              <>
                                                <p style={{ fontSize: '12px', color: '#333', padding: '10px' }}>
                                                  {" "}
                                                  <span style={{ fontSize: '14px', fontWeight: '500', paddingRight: '10px' }}>Subtotal: </span>
                                                  {formatCurrency(
                                                    selected_currency,
                                                    el.amount.value + productStatus.grand_total
                                                  )}
                                                </p>
                                                <p style={{ fontSize: '12px', color: '#333', padding: '10px' }}>
                                                  {" "}
                                                  <span style={{ fontSize: '14px', fontWeight: '500', paddingRight: '10px' }}>Discount: </span>-
                                                  {formatCurrency(selected_currency, el.amount.value)}
                                                </p>
                                                <p style={{ fontSize: '12px', color: '#333', padding: '10px' }}>
                                                  {" "}
                                                  <span style={{ fontSize: '14px', fontWeight: '500', paddingRight: '10px' }}>Grand Total:</span>
                                                  {formatCurrency(
                                                    selected_currency,
                                                    productStatus.grand_total
                                                  )}
                                                </p>
                                              </>
                                            ))
                                          )}
                                        </>
                                      );
                                    })}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td bgcolor="#EAEAEA" align="center" style={{ background: '#EAEAEA', textAlign: 'center', padding: '10px' }}>
                        <center>
                          <p style={paragraphStyle}>Thank you, <strong>FME Magento Extensions and Themes</strong></p>
                        </center>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
