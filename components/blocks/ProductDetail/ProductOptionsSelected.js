import { useEffect } from 'react';

const ProductOptionsSelected = ({ options, defaultPrice, setTotalPriceOptions, selectedOptions, setSelectedOptions }) => {
  useEffect(() => {
    let calculatedPrice = defaultPrice;

    for (const optionId in selectedOptions) {
      const option = selectedOptions[optionId];

      if (Array.isArray(option)) {
        option.forEach((item) => {
          calculatedPrice += item.price;
        });
      } else {
        calculatedPrice += option.price;
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
    <div>
        <h2>Selected</h2>
      {options.map((option) => {
        const { option_id, title, radio_option, checkbox_option } = option;

        return (
          <div key={option_id}>
            <h3>{title}</h3>
            {radio_option && (
              <div>
                {radio_option.map((radio) => (
                  <div key={radio.option_type_id}>
                    <input
                      type="radio"
                      id={`radio_${radio.option_type_id}`}
                      name={`radio_${option_id}`}
                      value={radio.option_type_id}
                      checked={selectedOptions[option_id]?.optionTypeId === radio.option_type_id}
                      onChange={() =>
                        handleRadioChange(option_id, radio.option_type_id, radio.price)
                      }
                    />
                    <label htmlFor={`radio_${radio.option_type_id}`}>{radio.title} ${radio.price}</label>
                  </div>
                ))}
              </div>
            )}
            {checkbox_option && (
              <div>
                {checkbox_option.map((checkbox) => (
                  <div key={checkbox.option_type_id}>
                    <input
                      type="checkbox"
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
                    <label htmlFor={`checkbox_${checkbox.option_type_id}`}>{checkbox.title} ${checkbox.price}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductOptionsSelected;
