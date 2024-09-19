import ImageBlock from '@/components/global/ImageBlock'
import { useState } from 'react'
import LoginForm from '../Login/login'
import dlv from 'dlv'
import AddressForm from '@/components/shared/AddressForm'
import { logout } from '@/pages/api/login'

export default function BillingInfo({ cart, customer, setDefaultBilling, setUser, IsLoginForm, setIsLoginForm, isOrderButtonClicked, recaptchaRef, sarabun }) {
    const [isAddressForm, setIsAddressForm] = useState(false)

    const openIsLoginForm = () => {
        setIsLoginForm(true)
    }

    const closeIsLoginForm = () => {
        setIsLoginForm(false)
    }

    const handleNewAddress = (event) => {
        const addressArray = dlv(customer, 'data.customer.addresses');
        const selectedAddressId = event.target.value;

        const defaultBilling = addressArray.find((address) => dlv(address, 'id') == selectedAddressId);

        if (defaultBilling) {
            setDefaultBilling(defaultBilling);
        }

        if (event.target.value == 'new') {
            setDefaultBilling(null);
            setIsAddressForm(true)
        } else {
            setIsAddressForm(false)
        }
    }

    const handleLogout = () => {
        logout();
        setUser(null);
    }

    return (
        <>
            <div className="checkout_block_inner billing_info">
                {customer === null && <div className="shoping_title_row">
                    <h3 className={`${sarabun} title`}>
                        <ImageBlock image="/images/check_detail.png" /> Your Detail
                    </h3>
                    <div className="login">
                        <span className='hidden md:inline-block'>Already Have an Account</span>
                        <div className='shoping_highlighted_link' onClick={IsLoginForm ? closeIsLoginForm : openIsLoginForm}>
                            Login
                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M1 10.5117L11 1.51172M11 1.51172V10.1517M11 1.51172H1.4" stroke="#414141" strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
                }
                {customer === null ? IsLoginForm ?  <><LoginForm setUser={setUser} redirectTo={`/checkout`} isCheckout={true} checkOutFieldClass={true} checkOutClass="checkout_login_form"/><AddressForm recaptchaRef={recaptchaRef} customer={customer} cart={cart} isOrderButtonClicked={isOrderButtonClicked} setDefaultBilling={setDefaultBilling} setUser={setUser} /></>: <AddressForm recaptchaRef={recaptchaRef} customer={customer} cart={cart} isOrderButtonClicked={isOrderButtonClicked} setDefaultBilling={setDefaultBilling} setUser={setUser} />
                    :
                    dlv(customer, 'data.customer.addresses') &&
                    <>
                        <div className="shoping_title_row mb-6">
                            <h3 className={`${sarabun} title`}>
                                <ImageBlock image="images/check_detail.png" /> Billing Address
                            </h3>
                        </div>
                        <div className="form_field">
                            <select onChange={handleNewAddress} className='form_item'>
                                {dlv(customer, 'data.customer.addresses').map((address, index) => {
                                    // Check if the address ID matches the default_billing value
                                    const isDefaultBilling = dlv(customer, 'data.customer.default_billing') == dlv(address, 'id');
                                    return (
                                        <option
                                            key={`address-${dlv(address, 'id')}`}
                                            value={dlv(address, 'id')}
                                            // Set the selected attribute for the default billing address
                                            selected={isDefaultBilling ? 'selected' : ''}
                                        >
                                            {dlv(address, 'firstname')} {dlv(address, 'lastname')} {dlv(address, 'city')}{' '}
                                            {dlv(address, 'street').map((street) => street)}
                                        </option>
                                    );
                                })}
                                <option value={`new`}>New Address</option>
                            </select>
                        </div>

                        {dlv(customer, 'data.customer.addresses.length') == 0 && <AddressForm recaptchaRef={recaptchaRef} customer={customer} cart={cart} isOrderButtonClicked={isOrderButtonClicked} setDefaultBilling={setDefaultBilling} setUser={setUser} />}
                        {isAddressForm && <AddressForm recaptchaRef={recaptchaRef} customer={customer} cart={cart} isOrderButtonClicked={isOrderButtonClicked} setDefaultBilling={setDefaultBilling} setUser={setUser} />}
                    </>
                }
            </div>
        </>
    )
}
