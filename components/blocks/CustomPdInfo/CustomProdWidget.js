import React from 'react'

export default function CustomProdWidget({custInfo}) {
  return (
    <>
        <div className={`cust_block item-${custInfo.id}`} key={custInfo.id}>
            <h3 className="secondary_title">{custInfo.title}</h3>
            <p className="primary_text">{custInfo.desc}</p>

            <div className="cust_counter">
                <span className="count">{custInfo.value}</span>
                <span className="text">{custInfo.text}</span>
            </div>
        </div>
    </>
  )
}
