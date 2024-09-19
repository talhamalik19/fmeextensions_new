import customerApi from "@/pages/api/customer";
import React, { useState, useEffect } from "react";
import dlv from "dlv";
import Account from "../Account";
import {customer} from "@/pages/api/login";
import { useRouter } from "next/router";
import Link from "next/link";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";

const UpdateAccount = ({ user, setUser, sarabun }) => {
  const recaptchaRef = useRef();
  let token = false;
  const customerdata = user;
  const router = useRouter()
  const query = router.query;

  const [firstName, setFirstName] = useState(
    dlv(customerdata, "data.customer.firstname")
  );
  const [lastName, setLastName] = useState(
    dlv(customerdata, "data.customer.lastname")
  );
  const [emailInput, setEmail] = useState(dlv(customerdata, "data.customer.email"));
  const [password, setPassword] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmpass, setConfirmPass] = useState('');
  const [emailCheckbox, setEmailCheckbox] = useState(false);
  const [passwordCheckbox, setPasswordCheckbox] = useState(query.password || false);
  const [shipping, setShipping] = useState(false);
  const [showpass, setShowpass] = useState(false);
  const [updatedCustomer, setUpdateCustomer] = useState(false);
  const [state, setState] = useState(true);
  const[errorHandling, setErrorHandling] = useState(false)
  const [responseMsg, setResponseMsg] = useState("");
  const [style, setStyle] = useState({
      color: '#38a139',
      fontWeight: '400',
      fontSize: '17px',
      marginBottom: '10px'
  })
  const [emailChange, setChangeEmail] = useState(false)

  useEffect(()=>{
    setFirstName(dlv(customerdata, "data.customer.firstname"))
    setLastName(dlv(customerdata, "data.customer.lastname"))
    setEmail(dlv(customerdata, "data.customer.email"))
  }, [customerdata])

  const onReCAPTCHAChange = (captchaCode) => {
    // If the reCAPTCHA code is null or undefined indicating that
    // the reCAPTCHA was expired then return early
    if (!captchaCode) {
        return;
    }
    token = captchaCode;
};

  const handleUpdate = async (
    fname,
    lname,
    email,
    oldPass,
    newpassword,
    passwordcb,
    emailcb,
    token
  ) => {
     if (passwordCheckbox) {
      if (!password || !newpassword) {
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
      }
       return setErrorHandling(true)
      }
      if(newPass !== confirmpass){
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
      }
       return setErrorHandling(true)
      }
    }

    if (emailCheckbox) {
      if (!email || !password) {
       return setErrorHandling(true)
      }
      if (dlv(customerdata, "data.customer.email").toLowerCase() == email.toLowerCase()) {
        return setChangeEmail(true)
      }
    }

    if (!firstName || !lastName) {
    return  setErrorHandling(true)
    }

      try{
        setErrorHandling(false)
      const response = await customerApi(
        fname,
        lname,
        email,
        oldPass,
        newpassword,
        passwordcb,
        emailcb,
        token
      ).then(async(res) => {
        const {firstname, lastname, email, ...rest} = customerdata.data.customer;

        const update = {
         ...rest,
         firstname, lastname, email
       }
       if(res.errors){
        setUpdateCustomer(true);
        setStyle({
          color: 'red',
          fontWeight: '400',
          fontSize: '17px',
          marginBottom: '10px'
        })
        const error = res.errors[0].message;
       setResponseMsg(error)
       if (recaptchaRef.current) {
        recaptchaRef.current.reset();
    }
       }
        else {
          setStyle({
            color: '#38a139',
            fontWeight: '400',
            fontSize: '17px',
            marginBottom: '10px'
          })
          setChangeEmail(false)
          setResponseMsg('Account Updated')
          const fetchedCustomer = await customer(update);
          setUser(fetchedCustomer)
  
          setUpdateCustomer(true);
          setPassword("");
          setNewPass("");
          setConfirmPass("");
        }
      });
      }catch(e){ console.log(e) }
  };

  return (
    <>
     <div className="py-4 flex-1 md:p-4 lg:p-8 account-right-col">
        <h2 className={`text-lg md:text-2xl xl:text-3xl text-titleColor font-semibold mb-4 lg:mb-8 after:'' after:w-[2em] after:h-[2px] after:bg-primaryColor after:block after:mt-1 ${sarabun}`}>
          Account Information
        </h2>
          {updatedCustomer && (
            <p style={style}>{responseMsg}</p>
          )}
          {emailChange && <p className="text-red-400 text-[18px] mb-4 ">Email is not Changed</p>}
          <h2 className={`text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium ${sarabun}`}>
            Edit Account Information
          </h2>
          <div className="flex-col flex gap-[10px] md:gap-[50px] md:flex-row">
            <div className="form_block w-[100%] md:w-[50%] h-fit">
              <div class="form_field full">
                <input
                  type="text"
                  name="firstname"
                  id="firstname"
                  class="form_item"
                  required=""
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  />
                  {errorHandling && !firstName && <p className="mt-2 text-red-600">This field can't be empty</p>}
              </div>
              <div class="form_field full">
                <input
                  type="text"
                  name="lastname"
                  id="lastname"
                  class="form_item"
                  required=""
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              {errorHandling && !lastName && <p className="mt-2 text-red-600">This field can't be empty</p>}
              </div>

              <div className="form_check full">
                <input
                  className="form_check"
                  type="radio"
                  name="radio1"
                  id="chngEmail"
                  value={emailCheckbox}
                  onChange={() => {
                    setPasswordCheckbox(false)
                    setEmailCheckbox(true); setChangeEmail(false); setUpdateCustomer(false)}
                  }
                />
                <label htmlFor="chngEmail" className="form_check_label">Change Email</label>
              </div>

              <div className="form_check full">
                <input
                  className="form_check"
                  type="radio"
                  name="radio1"
                  id="chngPass"
                  checked={passwordCheckbox}
                  onChange={() =>{
                    setEmailCheckbox(false)
                    setPasswordCheckbox(true); setUpdateCustomer(false); setChangeEmail(false)}
                  }
                />
                <label htmlFor="chngPass" className="form_check_label">Change Password</label>
              </div>

              <div className="form_check full">
                <input
                  className="form_check"
                  type="checkbox"
                  name="shipping"
                  id="shipping"
                  value={shipping}
                  onChange={()=>{setShipping((prev)=>!prev)}}
                />
                <div className="flex align-center">
                <label htmlFor="shipping" className="form_check_label relative">
                  Allow Remote Shopping Assistance{" "}
                  <span className="peer text-sm inline-flex items-center justify-center border-2 rounded-full cursor-pointer border-black-500 border-solid relative w-[25px] h-[25px] ml-2" >
                    ?
                  </span>
                  
                 <span className="origin-top-right z-10 absolute right-0 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden peer-hover:block p-4">
                    This allows merchants to "see what you see" and take actions
                    on your behalf in order to provide better assistance.
                  </span>
                </label>
                  </div>
              </div>
            </div>

            <div className="form_block w-[100%] md:w-[50%] h-fit">
              <div
                class={`${emailCheckbox ? "block" : "hidden"} form_field full`}
              >
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="form_item"
                  required=""
                  placeholder="Email"
                  value={emailInput}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailCheckbox && errorHandling && !emailInput && <p className="mt-2 text-red-600">This field can't be empty</p>}
              </div>
              <div
                class={`${
                  passwordCheckbox || emailCheckbox ? "block" : "hidden"
                } form_field full`}
              >
                <input
                  className="form_item"
                  type={showpass ? "text" : "password"}
                  id="currentpass"
                  placeholder="Current Password"
                  value={password}
                  autoComplete="off"
                  onChange={(e) => setPassword(e.target.value)}
                  required={passwordCheckbox}
                />
              {emailCheckbox &&errorHandling && !password && <p className="mt-2 text-red-600">This field can't be empty</p> ||passwordCheckbox && errorHandling && !password && <p className="mt-2 text-red-600">This field can't be empty</p> }
              </div>

              <div
                className={`${
                  passwordCheckbox ? "block" : "hidden"
                } form_field full`}
              >
                <input
                  className="form_item"
                  type={showpass ? "text" : "password"}
                  id="newpass"
                  value={newPass}
                  required={passwordCheckbox}
                  placeholder="New Password"
                  onChange={(e) => setNewPass(e.target.value)}
                />
              {passwordCheckbox && errorHandling && !newPass && <p className="mt-2 text-red-600">This field can't be empty</p>}
              </div>

              <div
                className={`${
                  passwordCheckbox ? "block" : "hidden"
                } form_field full`}
              >
                <input
                  className="form_item"
                  type={showpass ? "text" : "password"}
                  id="confirmpass"
                  value={confirmpass}
                  required={passwordCheckbox}
                  placeholder="Confirm New Password"
                  onChange={(e) => setConfirmPass(e.target.value)}
                  />
                  {passwordCheckbox && errorHandling && !confirmpass && <p className="mb-4 text-red-600">This field can't be empty</p>}
                  {errorHandling && newPass !== confirmpass && <p className="mb-4 text-red-600">Password Donot match</p>}
                  </div>
                <div className={`form_check full ${emailCheckbox || passwordCheckbox ? 'block' : 'hidden'}`}>
                <input
                  className="form_check"
                  type="checkbox"
                  value={showpass}
                  onChange={() => {
                    setShowpass((showpass) => !showpass);
                  }}
                  name="showPassword"
                  id="showPassword"
                />
                <label htmlFor="showPassword" className="form_check_label">Show Password</label>
              </div>
              
              {passwordCheckbox && <div className="recaptcha full">
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Lc60jAdAAAAANlq5hBUm6By4EtksTk91hKLDlqx`}
                        onChange={onReCAPTCHAChange}
                        ref={recaptchaRef}
                    />
        </div>}
            </div>
          </div>
          <button
            onClick={() => {
              handleUpdate(
                firstName,
                lastName,
                emailInput,
                password,
                newPass,
                passwordCheckbox,
                emailCheckbox,
                token
              );
            }}
            className="primary_cta cursor-pointer my-6 mr-4"
          >
            Save
          </button>

          <Link href='/customer/account' className="primary_cta secondary_cta">Cancel</Link>
      
      </div>
    </>
  );
};
export default UpdateAccount;
