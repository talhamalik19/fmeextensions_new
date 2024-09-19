import { useState } from 'react'

export default function ProductQty() {


    // Below useState is updating quantity and qty can not go below 1 and above 10
    const [currentQty, setCurrentQty] =useState(1)
    const handleQtyMinus = () =>{
        setCurrentQty(prevCount => Math.max(prevCount - 1, 1));
    }
    const handleQtyPlus = () =>{
        setCurrentQty(prevCount => Math.min(prevCount + 1, 10));
    }

    const handleQuantity = () =>{
    }

    return (

        <div className="prod_qty">
            <span className="primary_text">Qty:</span>
            <div className="qty_block">
                <button aria-label='Increase Quantity' className='qty_btn minus' onClick={handleQtyMinus}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="2" viewBox="0 0 15 2" fill="none">
                        <path d="M15 2H0V0H15V2Z" fill="#253D4E" />
                    </svg>
                </button>
                <input aria-label='Quantity' type="text" name="qty" id="qty" value={currentQty} className='qty_field' onChange={handleQuantity}/>
                <button aria-label='Decrease Quantity' className='qty_btn pluse' onClick={handleQtyPlus}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill="#253D4E" />
                    </svg>
                </button>
            </div>
        </div>
    )
}
