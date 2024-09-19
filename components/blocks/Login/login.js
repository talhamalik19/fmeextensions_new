import Link from "next/link";
import React, { useState } from "react";
import login from "@/pages/api/login";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authActions } from "@/store/authSlice";
import { assignCustomerToCart } from "@/pages/api/cart";
import dlv from "dlv";

const LoginForm = ({ ctaData, redirectTo, setUser, isCheckout=false, checkOutClass, checkOutFieldClass, sarabun }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const forgotPg = "forgotpassword";
  const [errorHandling, setErrorHandling] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Show password when clicked

  const [showPassword, setShowPassword] = useState(false);
  const passwordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
    // Add a class to the show_pass span when clicked
    const showPassSpan = document.querySelector(".show_pass");
    if (showPassSpan) {
      showPassSpan.classList.toggle("active");
    }
  };

  const handleLogin = async (e) => {
    setErrorHandling(false);
    e.preventDefault();
    try {
      setIsLoading(true);
      const userLogin = await login(email, password);
      if (dlv(userLogin, "data.customer.email")) {
        const assignCustomer = await assignCustomerToCart();
        dispatch(authActions.setUser(userLogin));
        setUser(userLogin);
        setIsLoading(false);
        router.push(redirectTo);
      } else {
        if (userLogin.errors) {
          setErrorHandling(userLogin.errors[0].message);
          setIsLoading(false);
        }
      }

      // Redirect or perform any necessary action after successful login
    } catch (error) {
      setErrorHandling("Invalid Request");
      setIsLoading(false);
      // Handle login error
    }
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin(e);
    }
  };

  return (
    <div className="form_container">
      {dlv(ctaData, "login_text") && (
        <h2 className={`${sarabun} title`}>{dlv(ctaData, "login_text")}</h2>
      )}
      <form onSubmit={handleLogin} className={`form_block ${checkOutClass}`}>
        <div className={checkOutFieldClass === true ? 'form_field half' : 'form_field full'}>
          {!isCheckout && <label htmlFor="email" className="form_label">
            Email *
          </label>}
          <input
            type="email"
            value={email}
            name=""
            id="email"
            className="form_item"
            required
            onChange={(e) => setEmail(e.target.value)}
            onKeyUpCapture={handlePasswordKeyPress}
            placeholder="Email"
          />
        </div>
        <div className={checkOutFieldClass === true ? 'form_field half' : 'form_field full'}>
          {!isCheckout && <label htmlFor="password" className="form_label">
            Password *
          </label>}
          <div className="pass_inner">
            <input
              type={showPassword ? "text" : "password"}
              name=""
              value={password}
              id="password"
              className="form_item"
              required
              onChange={(e) => setPassword(e.target.value)}
              onKeyUpCapture={handlePasswordKeyPress}
              placeholder="Password"
            />
            <span className="show_pass" onClick={passwordVisibility}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="13"
                viewBox="0 0 20 13"
                fill="none"
              >
                <path
                  d="M19.9561 6.2975C19.9272 6.2325 19.2221 4.695 17.6476 3.14667C16.1865 1.71167 13.6763 0 10 0C6.32368 0 3.81348 1.71167 2.35245 3.14667C0.777852 4.695 0.0727586 6.23 0.0439446 6.2975C0.0149717 6.3615 0 6.43078 0 6.50083C0 6.57089 0.0149717 6.64016 0.0439446 6.70417C0.0727586 6.76833 0.777852 8.30583 2.35245 9.85417C3.81348 11.2892 6.32368 13 10 13C13.6763 13 16.1865 11.2892 17.6476 9.85417C19.2221 8.30583 19.9272 6.77083 19.9561 6.70417C19.985 6.64016 20 6.57089 20 6.50083C20 6.43078 19.985 6.3615 19.9561 6.2975ZM10 12C7.34065 12 5.01858 11.0483 3.09737 9.1725C2.292 8.38546 1.61049 7.48472 1.07531 6.5C1.61034 5.51544 2.29187 4.61495 3.09737 3.82833C5.01858 1.95167 7.34065 1 10 1C12.6594 1 14.9814 1.95167 16.9026 3.82833C17.7081 4.61495 18.3897 5.51544 18.9247 6.5C18.3848 7.5175 15.678 12 10 12ZM10 2.66667C9.22898 2.66667 8.47527 2.89149 7.83419 3.3127C7.19311 3.73391 6.69345 4.3326 6.39839 5.03305C6.10333 5.7335 6.02613 6.50425 6.17655 7.24785C6.32697 7.99144 6.69825 8.67448 7.24345 9.21058C7.78864 9.74668 8.48326 10.1118 9.23947 10.2597C9.99568 10.4076 10.7795 10.3317 11.4918 10.0415C12.2042 9.7514 12.813 9.26007 13.2414 8.62969C13.6697 7.9993 13.8984 7.25816 13.8984 6.5C13.897 5.48374 13.4859 4.50949 12.7551 3.79089C12.0243 3.07228 11.0335 2.66799 10 2.66667ZM10 9.33333C9.43012 9.33333 8.87303 9.16716 8.39919 8.85583C7.92534 8.5445 7.55603 8.10199 7.33794 7.58427C7.11986 7.06655 7.06279 6.49686 7.17397 5.94724C7.28515 5.39763 7.55958 4.89278 7.96255 4.49653C8.36552 4.10028 8.87893 3.83043 9.43787 3.72111C9.9968 3.61178 10.5762 3.66789 11.1027 3.88234C11.6292 4.09679 12.0792 4.45995 12.3958 4.92588C12.7124 5.39182 12.8814 5.93962 12.8814 6.5C12.8814 7.25145 12.5778 7.97212 12.0375 8.50347C11.4971 9.03482 10.7642 9.33333 10 9.33333Z"
                  fill="#6D6D75"
                />
              </svg>
            </span>
          </div>
        </div>
        <div className="form_field full">
          <Link href={forgotPg} className="forgot_pass loading_action">
            Forgot Password?
          </Link>
        </div>
        {errorHandling && <div className="form_button full">
          <p className="text-red">{errorHandling && errorHandling}</p>
        </div>}
        <div className="form_button full">
          <button className="form_cta primary_cta">
            {isLoading ? <div className="spinner"></div> : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
