import { getCookie } from "cookies-next";

const currency = (price ) => {
    let roundedAmount = 0;
        const defaultCurrency = getCookie('defaultCurrency') ? JSON.parse(getCookie('defaultCurrency')).data.attributes : [];
        const currentCurrency = getCookie('currentCurrency') ? JSON.parse(getCookie('currentCurrency')).data.attributes : [];

        if (getCookie('currentCurrency') && defaultCurrency.code != currentCurrency.code) {
            const decimalPlaces = currentCurrency.decimalPlaces;
            let symbolLeft = currentCurrency.symbolLeft;
            let symbolRight = currentCurrency.symbolRight;
            let amount = price * currentCurrency.value;
            roundedAmount = amount.toFixed(decimalPlaces);

            if (symbolLeft !== null && symbolRight !== null) {
                roundedAmount=(`${symbolLeft}${roundedAmount}${symbolRight}`);
            } else if (symbolLeft !== null) {
                roundedAmount=(`${symbolLeft}${roundedAmount}`);
            } else if (symbolRight !== null) {
                roundedAmount=(`${roundedAmount}${symbolRight}`);
            } else {
                roundedAmount=(roundedAmount);
            }
        } else {
            const decimalPlaces = defaultCurrency.decimalPlaces;
            let symbolLeft = currentCurrency.symbolLeft;
            let symbolRight = currentCurrency.symbolRight;
            let amount = price * defaultCurrency.value;
            roundedAmount = amount.toFixed(decimalPlaces);

            if (symbolLeft !== null && symbolRight !== null) {
                roundedAmount=(`${symbolLeft}${roundedAmount}${symbolRight}`);
            } else if (symbolLeft !== null) {
                roundedAmount=(`${symbolLeft}${roundedAmount}`);
            } else if (symbolRight !== null) {
                roundedAmount=(`${roundedAmount}${symbolRight}`);
            } else {
                roundedAmount=(roundedAmount);
            }
        }

    return roundedAmount;
};

export const Currency = currency;

export default currency;
