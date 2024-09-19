import React, { useEffect, useState } from "react";
import dlv from "dlv";
import countries from "@/pages/api/countries";
import ReCAPTCHA from "react-google-recaptcha";
import CustomDropdown from "./countriesDropDown";

const AddressForm = ({ ctaData, customer, setDefaultBilling, isOrderButtonClicked, recaptchaRef }) => {
    const [errorHandling, setErrorHandling] = useState(false);
    const [saveInAddress, setSaveInAddress] = useState(false);
    const [company, setCompany] = useState('');
    const [streetAddress2, setStreetAddress2] = useState('');
    const [countriesData, setCountriesData] = useState([]);
    const [token, setToken] = useState(false);

    // Function to handle field change
    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        const isValidField = value.trim() !== ''; // Basic validation, you can extend it
        setFieldValidity({ ...fieldValidity, [name]: isValidField });
        // Update the field value
        setFieldValues({
            ...fieldValues,
            [name]: isValidField ? value : null
        });
    };

    const [fieldValidity, setFieldValidity] = useState({
        firstname: true,
        lastname: true,
        phoneNumber: true,
        streetAddress1: true,
        country: true,
        state: true,
        city: true,
        zip: true,
        email:true,
        password: customer === null ? null : "",
    confirmPassword: customer === null ? null : ""
    });
    const initialFieldValues = {
        firstname: "",
        lastname: "",
        phoneNumber: "",
        streetAddress1: "",
        country: "",
        state: "",
        city: "",
        zip: "",
        email: "",
        password: "",
        confirmPassword: ""
    };

    const [fieldValues, setFieldValues] = useState(initialFieldValues);

    // Use useEffect to update fieldValues when customer data arrives
    useEffect(() => {
        if (customer) {
            const updatedFieldValues = {
                firstname: dlv(customer, 'data.customer.firstname') || "",
                lastname: dlv(customer, 'data.customer.lastname') || "",
                phoneNumber: dlv(customer, 'data.customer.telephone') || "",
                streetAddress1: "",
                country: dlv(customer, 'data.customer.country_code') || "",
                state: dlv(customer, 'data.customer.region.code') || "",
                city: dlv(customer, 'data.customer.city') || "",
                zip: dlv(customer, 'data.customer.postcode') || "",
                email: dlv(customer, 'data.customer.email') || ""
            };
            setFieldValues(updatedFieldValues);
        } else {
            // If customer data is null, reset to initial empty values
            setFieldValues(initialFieldValues);
        }
    }, [customer]);

    // Update setDefaultBilling on every field change
    useEffect(() => {
        if (validateForm()) {
            // Create the address object in the desired format
            const address = {
                firstname: fieldValues.firstname,
                lastname: fieldValues.lastname,
                street: [fieldValues.streetAddress1, streetAddress2],
                city: fieldValues.city,
                region: {
                    region_code: fieldValues.state,
                    region: fieldValues.state, // Use the state here; you might need to adjust this
                },
                postcode: fieldValues.zip,
                country_code: fieldValues.country,
                telephone: fieldValues.phoneNumber,
                company: company,
                saveAddress: saveInAddress,
                token: token,
                email: fieldValues.email,
                password: fieldValues.password || false
            };


            // Call setDefaultBilling with the address object
            setDefaultBilling(address);
        } else {
            setDefaultBilling('');
        }
    }, [saveInAddress, fieldValues.email, fieldValues.firstname, fieldValues.lastname, company, fieldValues.phoneNumber, fieldValues.streetAddress1, streetAddress2, fieldValues.country, fieldValues.state, fieldValues.city, fieldValues.zip, fieldValues.password, fieldValues.confirmPassword, token]);

    const validateForm = () => {
        const isValid = Object.values(fieldValues).every((value) => {
            // Check if value is not null before using trim
            return value !== null && value.trim() !== '';
        });
         // Adjust this as needed
    
         const isEmailValid = fieldValues.email !== null && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fieldValues.email.trim());

    
         setFieldValidity({
            firstname: fieldValues.firstname !== null && fieldValues.firstname.trim() !== '',
            lastname: fieldValues.lastname !== null && fieldValues.lastname.trim() !== '',
            phoneNumber: fieldValues.phoneNumber !== null && fieldValues.phoneNumber.trim() !== '',
            streetAddress1: fieldValues.streetAddress1 !== null && fieldValues.streetAddress1.trim() !== '',
            country: fieldValues.country !== null && fieldValues.country.trim() !== '',
            state: fieldValues.state !== null && fieldValues.state.trim() !== '',
            city: fieldValues.city !== null && fieldValues.city.trim() !== '',
            zip: fieldValues.zip !== null && fieldValues.zip.trim() !== '',
            email: isEmailValid, // Update email field validation
            password: customer ? true : (fieldValues.password !== null && fieldValues.password.trim() !== ''),
            confirmPassword: customer ? true : (fieldValues.confirmPassword !== null && fieldValues.confirmPassword.trim() !== ''),
            // Add more fields as needed
        });
        
    
        if (!isEmailValid) {
            //setErrorHandling('Please enter a valid email address.');
        } else {
            setErrorHandling('');
        }

        if (!customer && fieldValues.password !== fieldValues.confirmPassword) {
            setErrorHandling('Password Mismatch');
        } else {
            setErrorHandling('');
        }

        const isPasswordEqual = fieldValues.password === fieldValues.confirmPassword;
    
        return isValid && isEmailValid && isPasswordEqual; // Return true only if all fields are valid
        
    };
    

    const getCountries = async () => {
        const countryData = await countries();
        if (dlv(countryData, 'data.countries')) {
            setCountriesData(dlv(countryData, 'data.countries'));
        }
    };

    useEffect(() => {
        getCountries();
    }, [ctaData]);

    const handleSaveInAddressChange = () => {
        setSaveInAddress(!saveInAddress); // Toggle the state
    };

    const onReCAPTCHAChange = (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            setToken(false)
            return;
        }
        setToken(captchaCode)
    };

    return (
        <div className="form_container">
            {dlv(ctaData, 'create_account_text') && <h2 className="title">Create an Account</h2>}
            {dlv(ctaData, 'info_text') && <p className="primary_text">Personal Information</p>}
            <div className="form_block">
                <div className="form_field half">
                    <input placeholder="First Name" type="text" name="firstname" id="firstName" value={fieldValues.firstname} className={`form_item ${fieldValidity.firstname ? '' : isOrderButtonClicked && 'err-red'}`} required onChange={handleFieldChange} />
                </div>
                <div className="form_field half">
                    <input placeholder="Last Name" type="text" name="lastname" id="lastName" value={fieldValues.lastname} className={`form_item ${fieldValidity.lastname ? '' : isOrderButtonClicked && 'err-red'}`} required onChange={handleFieldChange} />
                </div>
                <div className="form_field half">
                    <input placeholder="Company" type="text" name="company" id="company" value={company} className={`form_item`} onChange={(event)=>setCompany(event.target.value)} />
                </div>
                <div className="form_field half">
                    <input placeholder="Phone Number" type="text" name="phoneNumber" id="phone" value={fieldValues.phoneNumber} className={`form_item ${fieldValidity.phoneNumber ? '' : isOrderButtonClicked && 'err-red'}`} required onChange={handleFieldChange} />
                </div>
                <div className="form_field full">
                    <input placeholder="Street Address" type="text" name="streetAddress1" id="streetAddress1" value={fieldValues.streetAddress1} className={`form_item ${fieldValidity.streetAddress1 ? '' : isOrderButtonClicked && 'err-red'}`} required onChange={handleFieldChange} />

                </div>
                <div className="form_field half">
                    {/* Create a select field for countries */}
                    <CustomDropdown
                        countriesData={countriesData}
                        fieldValues={fieldValues}
                        handleFieldChange={handleFieldChange}
                        fieldValidity={fieldValidity}
                        isOrderButtonClicked={isOrderButtonClicked}
                    />
                    {/* <select
                        id="country"
                        value={fieldValues.country}
                        name="country"
                        required
                        onChange={handleFieldChange}
                        className={`form_item ${fieldValidity.country ? '' : isOrderButtonClicked && 'err-red'}`}
                    >
                        <option value="">Select Country</option>
                        {countriesData.map((country) => (
                            <option key={country.id} value={country.id}>
                                {country.full_name_locale}
                            </option>
                        ))}
                    </select> */}
                </div>

                <div className="form_field half">
                    {fieldValues.country && countriesData.find((c) => c.id === fieldValues.country)?.available_regions ? (
                        <select
                            id="state"
                            name="state"
                            value={fieldValues.state}
                            required
                            onChange={handleFieldChange}
                            className={`form_item ${fieldValidity.state ? '' : isOrderButtonClicked && 'err-red'}`}
                        >
                            <option value="">Select State/Province</option>
                            {countriesData.find((c) => c.id === fieldValues.country)?.available_regions.map((region) => (
                                <option key={region.id} value={region.code}>
                                    {region.name}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            name="state"
                            id="state"
                            required
                            placeholder="State"
                            value={fieldValues.state}
                            className={`form_item ${fieldValidity.state ? '' : isOrderButtonClicked && 'err-red'}`}
                            onChange={handleFieldChange}
                        />
                    )}
                </div>
                <div className="form_field half">
                    <input placeholder="City" type="text" name="city" id="city" value={fieldValues.city} className={`form_item ${fieldValidity.city ? '' : isOrderButtonClicked && 'err-red'}`} required onChange={handleFieldChange} />
                </div>
                <div className="form_field half">
                    <input placeholder="Zip" type="text" name="zip" id="zip" value={fieldValues.zipCode} className={`form_item ${fieldValidity.zip ? '' : isOrderButtonClicked && 'err-red'}`} required onChange={handleFieldChange} />
                </div>
                {customer === null && <div className="form_field full">
                    <input placeholder="Email" type="email" name="email" id="email" value={fieldValues.email} className={`form_item ${fieldValidity.email ? '' : isOrderButtonClicked && 'err-red'}`} required onChange={handleFieldChange} />
                </div>}
                {customer === null && <div className="form_field half">
                    <input placeholder="Password" type="password" name="password" id="password" value={fieldValues.password} className={`form_item ${fieldValidity.password ? '' : isOrderButtonClicked && 'err-red'}`} required onChange={handleFieldChange} />
                </div>}
                {customer === null && <div className="form_field half">
                    <input placeholder="Confirm Password" type="password" name="confirmPassword" id="confirmPassword" value={fieldValues.confirmPassword} className={`form_item ${fieldValidity.confirmPassword ? '' : isOrderButtonClicked && 'err-red'}`} required onChange={handleFieldChange} />
                </div>}
                <div className="form_check full">
                    <input type="checkbox" name="" id="save_in_address" className="form_check" checked={saveInAddress} onChange={handleSaveInAddressChange} />
                    <label htmlFor="save_in_address" className="form_check_label"> Save In Address Book</label>
                </div>
                <div className="recaptcha full">
                    <ReCAPTCHA
                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Lc60jAdAAAAANlq5hBUm6By4EtksTk91hKLDlqx`}
                        onChange={onReCAPTCHAChange}
                        ref={recaptchaRef}
                    />
                </div>
                {errorHandling && <div className="form_button full">
                    <p className='text-red'>{errorHandling && errorHandling}</p>
                </div>}
            </div>
        </div>
    );
};

export default AddressForm;
