import React, {useState, useEffect} from 'react'
import dlv from 'dlv'
import countries from "@/pages/api/countries";
import { addAddress } from "@/pages/api/customer";
import { updateAddress } from "@/pages/api/customer";
import {customer} from '@/pages/api/login';
import AddAddress from './index'


export default function AddressForm({address, user, changeAddress,setChangeAddress, setUser, addressForm, setAddressForm, billingId, shippingId, sarabun}) {
    const customerData = user || null
    const changeBillingAddress = billingId || null
    const changeShippingAddress = shippingId || null
    const [defaultAddress, setDefaultAddress] = useState(changeBillingAddress ? customerData.data.customer.addresses.find(item=>item.id === changeBillingAddress) : changeShippingAddress ? customerData.data.customer.addresses.find(item=>item.id === changeShippingAddress) :address || null)

    const street = defaultAddress !== null && defaultAddress.street.toString().split(",");

    const [firstname, setFirstName] = useState(defaultAddress !==null && changeAddress ?  defaultAddress.firstname:
      dlv(customerData, "data.customer.firstname")
    );
    const [lastname, setLastName] = useState(defaultAddress !==null && changeAddress ? defaultAddress.lastname :
      dlv(customerData, "data.customer.lastname")
    );
    const [company, setCompany] = useState(defaultAddress !== null && changeAddress && defaultAddress.company === 'null' ? '' :  defaultAddress !== null && changeAddress && defaultAddress.company === null ? '' : defaultAddress !== null && changeAddress ? defaultAddress.company  : '');
    const [phoneNumber, setPhoneNumber] = useState(defaultAddress !== null && changeAddress ? defaultAddress.telephone : "");
    const [streetAddress1, setStreetAddress1] = useState(defaultAddress !==null && changeAddress ? street[0] : "");
    const [streetAddress2, setStreetAddress2] = useState(defaultAddress !==null && changeAddress ? street[1] : "");
    const [country, setCountry] = useState(defaultAddress !== null && changeAddress ? defaultAddress.country_code : "");
    const [countriesData, setCountriesData] = useState([]);
    const [state, setState] = useState(defaultAddress !== null && changeAddress ? defaultAddress.region : "");
    const [city, setCity] = useState(defaultAddress !== null && changeAddress ? defaultAddress.city : "");
    const [zipCode, setZipCode] = useState(defaultAddress !== null && changeAddress ? defaultAddress.postcode : "");
    const [errorHandling, setErrorHandling] = useState(false);
    const [shipping, setShipping] = useState(defaultAddress !== null && changeAddress ? defaultAddress.default_shipping : false)
    const [billing, setBilling] = useState(defaultAddress !== null && changeAddress ? defaultAddress.default_billing : false)
    const [responseMessage, setResponseMessage] = useState("")
    const [data, setData] = useState();
    const [style, setStyle] = useState({
      color: '#38a139',
      fontWeight: '400',
      fontSize: '17px',
      marginBottom: '10px'
    })

  
    const getCountries = async () => {
      const countryData = await countries();
      if (dlv(countryData, "data.countries")) {
        setCountriesData(dlv(countryData, "data.countries"));
      }
    };
  
    useEffect(() => {
      getCountries();
    }, []);

    const {addresses, ...rest} = customerData.data.customer;

    const updatedCustomer = {
      ...rest, addresses
    }

    // useEffect(()=>{
    //   setFirstName(''); setLastName(''); setCompany(''); setPhoneNumber(''); setStreetAddress1(''); setStreetAddress2(''); setCountry(''); setCity(''); setZipCode('')
    // }, [addressForm])

    const handleAddressChange = async () => {
        if(changeAddress){
          if(!firstname ||
            !lastname ||
            !streetAddress1 ||
            !city ||
            !country ||
            !state ||
            !zipCode ||
            !phoneNumber){
              setErrorHandling(true)
              return
          }
          else{
          setErrorHandling(false);
          if(company === ''){
            setCompany(null)
          }
          const address = {
            firstname,
            lastname,
            street: [streetAddress1, streetAddress2],
            city,
            region: {
              region_code: state.region_code,
              region: state.region,
              region_id: state.region_id
            },
            postcode: zipCode,
            country_code: country,
            telephone: phoneNumber,
            company: company,
            shipping: shipping,
            billing: billing
          };
    
        const res = await updateAddress(defaultAddress.id, address)
            if (res.data.errors){
              setStyle({
                color: 'red',
                fontWeight: '400',
                fontSize: '17px',
                marginBottom: '10px'
              })
              const error = res.data.errors[0].message;
              setResponseMessage(error)
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            else{
              setStyle({
                color: '#38a139',
                fontWeight: '400',
                fontSize: '17px',
                marginBottom: '10px'
              })
              setResponseMessage(res.message)
              const fetchedCustomer = await customer(updatedCustomer);
              setUser(fetchedCustomer)
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }
        
      }
        else{
    
          if (
            !firstname ||
            !lastname ||
            !streetAddress1 ||
            !city ||
            !country ||
            !state.region ||
            !zipCode ||
            !phoneNumber
          ) {
           return setErrorHandling(true);
          }
          else {
            setErrorHandling(false);
            const address = {
              firstname,
              lastname,
              street: [streetAddress1, streetAddress2],
              city,
              region: {
                region_code: state.region_code,
                region: state.region,
                region_id: state.region_id
              },
              postcode: zipCode,
              country_code: country,
              telephone: phoneNumber,
              company: company,
              shipping: shipping,
              billing: billing
            };
      
           const res = await addAddress(address)
              if(res.data.errors){
                setStyle({
                  color: 'red',
                  fontWeight: '400',
                  fontSize: '17px',
                  marginBottom: '10px'
                })
                const error = res.errors[0].message
                setResponseMessage(error)
              }
             else{
              setStyle({
                color: '#38a139',
                fontWeight: '400',
                fontSize: '17px',
                marginBottom: '10px'
              })
                setResponseMessage(res.message)
                const fetchedCustomer = await customer(updatedCustomer);
                setUser(fetchedCustomer)
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            
          }
        }
      };

  return (
    <>
    {addressForm? (  <section className="border-solid border-b border-[#E4E4E4] pb-8 mb-8">
        <p className="" style={style}>{responseMessage}</p>
        {/* <h2 className="text-xl sm:text-2xl xl:text-3xl text-titleColor font-medium mb-6">Add New Address</h2> */}
        <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-6 divide-y divide-textColor">
          {/* First Column */}
          <div className="w-full">
            <div className="space-y-4">
              <h4 className={`text-gray-800 text-base sm:text-lg xl:text-xl font-medium ${sarabun}`}>
                Contact Information
              </h4>
            </div>
            <div className="form_block">
              <div className="form_field full">
              <label htmlFor="firstName" className="form_label ml-[10px]">First Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="firstName"
                  id="firstname"
                  className="form_item"
                  required=""
                  placeholder="First Name"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {errorHandling && !firstname && <p className="text-red-500 my-4">This field can't be empty</p>}
              </div>
              <div className="form_field full">
              <label htmlFor="lastname" className="form_label ml-[10px]">Last Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="lastName"
                  id="lastname"
                  className="form_item"
                  required=""
                  placeholder="Last Name"
                  value={lastname}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {errorHandling && !lastname && <p className="text-red-500 my-4">This field can't be empty</p>}
              </div>
              <div className="form_field full">
              <label htmlFor="company" className="form_label ml-[10px]">Company </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  className="form_item"
                  placeholder="Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="form_field full">
              <label htmlFor="phone" className="form_label ml-[10px]">Phone Number <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  className="form_item"
                  required=""
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
                {errorHandling && !phoneNumber && <p className="text-red-500 my-4">This field can't be empty</p>}
              </div>
            </div>
          </div>
          {/* Second Column */}
          <div className="w-full">
            <div className="space-y-4">
              <h4 className={`text-gray-800 text-base sm:text-lg xl:text-xl font-medium ${sarabun}`}>
                Address Information
              </h4>
            </div>
            <div className="form_block">
              <div className="form_field full">
              <label htmlFor="street" className="form_label ml-[10px]">Street <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  className="form_item"
                  required=""
                  placeholder="Street"
                  value={streetAddress1}
                  onChange={(e) => setStreetAddress1(e.target.value)}
                />
                {errorHandling && !streetAddress1 && <p className="text-red-500 my-4">This field can't be empty</p>}
              </div>
              <div className="form_field full">
              <label htmlFor="address" className="form_label ml-[10px]">Address <span className="text-red-500"></span></label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  className="form_item"
                  placeholder="Address"
                  value={streetAddress2}
                  onChange={(e) => setStreetAddress2(e.target.value)}
                />
              </div>

              <div className="form_field full">
                {/* Create a select field for countries */}
                <label htmlFor="country" className="form_label ml-[10px]">Country <span className="text-red-500">*</span></label>
                <select
                  id="country"
                  value={country}
                  onChange={(e) => {setCountry(e.target.value); setState("")}}
                  className="w-full py-2 px-2 bg-transparent outline-none border focus-border-red-600 shadow-sm rounded-lg form_item"
                >
                  <option value="">Select a country</option>
                  {countriesData.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.full_name_locale}
                    </option>
                  ))}
                </select>
                {errorHandling && !country && <p className="text-red-500 my-4">This field can't be empty</p>}
              </div>

              <div className="form_field full">
              <label htmlFor="state" className="form_label ml-[10px]">State <span className="text-red-500">*</span></label>
                {country &&
                countriesData.find((c) => c.id === country)
                  ?.available_regions ? (
                  <select
                    id="state"
                    value={changeAddress ? state.region_code : state.code}
                    onChange={(e) => {
                      setState({region: e.target.options[e.target.selectedIndex].getAttribute('name'), region_code: e.target.value, region_id: e.target.options[e.target.selectedIndex].id});
                    }}
                    className="w-full py-2 px-2 bg-transparent outline-none border focus-border-red-600 shadow-sm rounded-lg form_item"
                  >
                    <option value="">Select a state/province</option>
                    {countriesData
                      .find((c) => c.id === country)
                      ?.available_regions.map((region) => (
                        <option
                          key={region.id}
                          value={region.code}
                          name={region.name}
                          id={region.id}
                        >
                          {region.name}
                        </option>
                      ))}
                  {errorHandling && !state && <p className="text-red-500 my-4">This field can't be empty</p>}
                  </select>
                  
                ) : (
                  <input
                    type="text"
                    name=""
                    id="state"
                    value={state.region}
                    placeholder="State/Province"
                    className="w-full py-2 px-2 bg-transparent outline-none border focus-border-red-600 shadow-sm rounded-lg form_item"
                    onChange={(e) => setState({region: e.target.value, region_code: e.target.value})}
                  />
                )}
                {errorHandling && !state && <p className="text-red-500 my-4">This field can't be empty</p>}
              </div>

              <div className="form_field full">
              <label htmlFor="city" className="form_label ml-[10px]">City <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name=""
                  id="city"
                  value={city}
                  className="w-full py-2 px-2 outline-none border focus-border-red-600 shadow-sm rounded-lg form_item"
                  required
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                />
                {errorHandling && !city && <p className="text-red-500 my-4">This field can't be empty</p>}
              </div>

              <div className="form_field full">
              <label htmlFor="zip" className="form_label ml-[10px]">Zip Code <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name=""
                  id="zip"
                  value={zipCode}
                  className="w-full py-2 px-2 outline-none border focus-border-red-600 shadow-sm rounded-lg form_item"
                  required
                  onChange={(e) => setZipCode(e.target.value)}
                  placeholder="Zip Code"
                />
                {errorHandling && !zipCode && <p className="text-red-500 my-4">This field can't be empty</p>}
              </div>

              <div className="form_field full">
                  <div className="form_check full mb-4 hidden">
                    <input type="checkbox" name="" id="shipping" className="form_check" checked={shipping} onChange={(e)=>setShipping(e.target.checked)} />
                    <label htmlFor="shipping" className="form_check_label">Use as my default Shipping Address</label>
                </div>

                <div className="form_check full">
                    <input type="checkbox" name="" id="billing" className="form_check" checked={billing} onChange={(e)=>setBilling(e.target.checked)} />
                    <label htmlFor="billing" className="form_check_label">Use as my default Billing Address</label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="error">
          {errorHandling && (
            <p className="text-red-500">Please fill all fields</p>
          )}
        </div>
        <button
          className="primary_cta cursor-pointer mt-8"
          onClick={handleAddressChange}
        >
          Save Address
        </button>
      </section> ): (<AddAddress user={customerData} setUser={setUser} address = {addressForm} setAddress = {setAddressForm}/>)}
    
    </>
  )
}
