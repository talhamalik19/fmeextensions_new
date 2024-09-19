import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

export default function ProductPrice({ currentPrice, oldPrice, product }) {
  const [currencySymbol, setCurrencySymbol] = useState('')

  try {
    useEffect(()=>{
      const symbol = getCookie('symbol_currency') || '$';
          setCurrencySymbol(symbol)
    }, [])
    
  } catch (error) {
    console.log(error)
  }
  return (
    <div className="prod_price">
      <span className="actual_price">{currencySymbol}{currentPrice.toFixed(2)}
      </span>
      {currentPrice != oldPrice && <del className="old_price">${oldPrice}</del>}
    </div>
  );
}
