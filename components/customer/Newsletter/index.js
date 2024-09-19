import React, { useState, useEffect } from "react";
import dlv from "dlv";
import {
  subscribeToNewsLetter,
  unSubscribeToNewsLetter,
} from "../../../pages/api/submitform";
import { customer } from "@/pages/api/login";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

export default function Newsletter({
  user,
  setUser, sarabun
  //  check
}) {
  const recaptchaRef = useRef();
  const customerData = user || null;
  // const checked = check || false;
  const [email, setEmail] = useState(dlv(customerData, "data.customer.email"));
  const [isValid, setIsValid] = useState(true);
  const [warning, setWarning] = useState('');
  const [subs, setInput] = useState(
    dlv(customerData, "data.customer. is_subscribed") ? true : false
  );
  const[errorMessage, setErrorMessage] = useState(false)
  let token = false;
  const [style, setStyle] = useState({
    color: '#38a139',
    fontWeight: '400',
    fontSize: '17px',
    marginBottom: '10px'
  })

  useEffect(() => {
    setInput(dlv(customerData, "data.customer.is_subscribed") || false);
  }, [customerData]);

  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
        return;
    }
    token = captchaCode;
};

  const handleForm = async () => {
    const { is_subscribed, ...rest } = customerData.data.customer || null;

    const updatedCustomer = {
      ...rest,
      is_subscribed,
    };
    if (subs) {
      const newsLetterData = await subscribeToNewsLetter(email, token);
      if (newsLetterData.errors) {
        setStyle({
          color: 'red',
          fontWeight: '400',
          fontSize: '17px',
          marginBottom: '10px'
        })
        setErrorMessage(true)
        newsLetterData.errors.map((error) => {
          setWarning(error.message);
          setIsValid(false);
        });
      } else {
        setStyle({
          color: '#38a139',
          fontWeight: '400',
          fontSize: '17px',
          marginBottom: '10px'
        })
        setWarning(newsLetterData.data.subscribeEmailToNewsletter.status);
        // updatedCustomer.is_subscribed = true;
        updatedCustomer.is_subscribed = true;
        const fetchedCustomer = await customer(updatedCustomer);
        setUser(fetchedCustomer);
        setErrorMessage(true)
      }
    } else {
      const newsLetterData = await unSubscribeToNewsLetter(email, token);
      if (newsLetterData.error) {
        setStyle({
          color: 'red',
          fontWeight: '400',
          fontSize: '17px',
          marginBottom: '10px'
        })
        setErrorMessage(true)
        const error = newsLetterData.error;
        setWarning(error)
          setIsValid(false);
          return
      } else {
        setStyle({
          color: '#38a139',
          fontWeight: '400',
          fontSize: '17px',
          marginBottom: '10px'
        })
        setWarning(
          newsLetterData.data.updateCustomer.customer.is_subscribed === false &&
            "Unsubscribed"
        );
        setErrorMessage(true)
        updatedCustomer.is_subscribed = false;
        const fetchedCustomer = await customer(updatedCustomer);
        setUser(fetchedCustomer);
      }
    }
  };

  return (
    <>
     <div className="py-4 flex-1 md:p-4 lg:p-8 account-right-col">
        <h2 className={`text-lg md:text-2xl xl:text-3xl text-titleColor font-semibold mb-4 lg:mb-8 after:'' after:w-[2em] after:h-[2px] after:bg-primaryColor after:block after:mt-1 ${sarabun}`}>
          Newsletter
        </h2>
      
      {errorMessage === true ? !isValid ? (
        <p
          style={style}
        >
          {warning}
        </p>
      ) : (
        <p
          style={style}
        >
          {warning}
        </p>
      ) : ''}
      <p className="text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium mb-2">
        Subscription option
      </p>{" "}
      <hr className="mb-2" />
      <div className="subscription">
        <div className="form_check full my-6">
          <input
            type="checkbox"
            id="subs"
            checked={subs}
            onChange={(e) => setInput((prevValue) => !prevValue)}
            className="form_check m-6"
          />
          <label htmlFor="subs" className="form_check_label">
            General Subscription
          </label>
        </div>
        {subs && <div className="recaptcha full mb-6">
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Lc60jAdAAAAANlq5hBUm6By4EtksTk91hKLDlqx`}
                        onChange={onReCAPTCHAChange}
                        ref={recaptchaRef}
                    />
        </div>}
        <button onClick={handleForm} className="primary_cta cursor-pointer">
          Submit
        </button>
      </div>
      </div>
    </>
  );
}
