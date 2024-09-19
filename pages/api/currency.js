import { setCookie } from "cookies-next";

const currency = {};

const changeCurrency = async (code) => {
  setCookie('currency_code', code, { path: '/' });
};


export { changeCurrency };
export default currency;
