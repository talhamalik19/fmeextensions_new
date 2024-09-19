import { CurrencyCodeToSymbol } from '@/components/shared/CurrencyCodeToSymbol';
import { getCookie } from 'cookies-next';
import dlv from 'dlv';
import { useEffect, useState } from 'react';

const ProductOptions = ({ options, defaultPrice, setTotalPriceOptions, selectedOptions, setSelectedOptions, product }) => {
  const [currencySymbol, setCurrencySymbol] = useState('')
  const [rate, setRate] = useState(0)
  function checkExchangeRates() {
    try {
      const parsedRates = product?.exchange_rates;
      const exchangeRate = parsedRates.find(rate => rate.currency_to == (getCookie('currency_code') || 'USD'));
        setRate(exchangeRate.rate)
    } catch (e) {
    }
  }
  useEffect(() => {
    const symbol = getCookie('symbol_currency') || '';
    checkExchangeRates();
    setCurrencySymbol(symbol)
    const defaultSelections = {};

    options.forEach((option) => {
      if (option.radio_option && option.required) {
        defaultSelections[option.option_id] = {
          optionTypeId: option.radio_option[0].option_type_id,
          price: option.radio_option[0].price,
        };
      } else if (option.checkbox_option && option.required) {
        defaultSelections[option.option_id] = [
          {
            optionTypeId: option.checkbox_option[0].option_type_id,
            price: option.checkbox_option[0].price,
          },
        ];
      }
    });

    setSelectedOptions(defaultSelections);
  }, [options]);

  useEffect(() => {
    let calculatedPrice = defaultPrice;
    for (const optionId in selectedOptions) {
      const option = selectedOptions[optionId];

      if (Array.isArray(option)) {
        option.forEach((item) => {
          calculatedPrice += item.price * rate;
        });
      } else {
        calculatedPrice += option.price * rate;
      }
    }

    setTotalPriceOptions(calculatedPrice);
  }, [selectedOptions, defaultPrice, setTotalPriceOptions]);

  const handleRadioChange = (optionId, optionTypeId, price) => {
    setSelectedOptions({
      ...selectedOptions,
      [optionId]: { optionTypeId, price },
    });
  };

  const handleCheckboxChange = (optionId, optionTypeId, price, checked) => {
    let updatedSelections = { ...selectedOptions };
    let currentSelection = updatedSelections[optionId] || [];

    if (!Array.isArray(currentSelection)) {
      currentSelection = [];
    }

    if (checked) {
      currentSelection.push({ optionTypeId, price });
    } else {
      currentSelection = currentSelection.filter((item) => item.optionTypeId !== optionTypeId);
    }

    updatedSelections = {
      ...updatedSelections,
      [optionId]: currentSelection,
    };

    setSelectedOptions(updatedSelections);
  };

  return (
    options.map((option) => {
      const { option_id, title, radio_option, checkbox_option } = option;

      return (
        <div key={option_id} className='editions'>
          <div className="title">{title}</div>
          {radio_option && (
            <div className='opt_inner'>
              {radio_option.map((radio) => {
                const isChecked = selectedOptions[option_id]?.optionTypeId === radio.option_type_id;
                return (
                  <div key={radio.option_type_id} className={`radio_block ${isChecked ? 'checked' : ''}`}>
                    <input
                      type="radio"
                      className='radio'
                      id={`radio_${radio.option_type_id}`}
                      name={`radio_${option_id}`}
                      value={radio.option_type_id}
                      checked={selectedOptions[option_id]?.optionTypeId === radio.option_type_id}
                      onChange={() =>
                        handleRadioChange(option_id, radio.option_type_id, radio.price)
                      }
                    />
                    <label htmlFor={`radio_${radio.option_type_id}`}><span>{radio.title} <span className="extra_rate">{radio.price > 0 && <CurrencyCodeToSymbol value={(radio.price * rate).toFixed(2)} currency={dlv(product, 'price.regularPrice.amount.currency')} />}</span></span></label>
                  </div>
                )
              })}
            </div>
          )}
          {checkbox_option &&
            <div className="opt_inner">
              {checkbox_option.map((checkbox) => {
                const isChecked = selectedOptions[option_id]?.some(
                  (item) => item.optionTypeId === checkbox.option_type_id
                );
                return (
                  <div key={checkbox.option_type_id} className={`radio_block ${isChecked ? 'checked' : ''}`}>
                    <input
                      type="checkbox"
                      className='radio'
                      id={`checkbox_${checkbox.option_type_id}`}
                      value={checkbox.option_type_id}
                      checked={selectedOptions[option_id]?.some(
                        (item) => item.optionTypeId === checkbox.option_type_id
                      )}
                      onChange={(e) =>
                        handleCheckboxChange(
                          option_id,
                          checkbox.option_type_id,
                          checkbox.price,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor={`checkbox_${checkbox.option_type_id}`}><span>{checkbox.title} <span className="extra_rate"><CurrencyCodeToSymbol value={(checkbox.price * rate).toFixed(2)} currency={dlv(product, 'price.regularPrice.amount.currency')} /></span></span></label>
                  </div>
                )
              })}
            </div>
          }
        </div>
      );
    })
  );
};

export default ProductOptions;