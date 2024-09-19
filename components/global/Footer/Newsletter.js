import { customer } from "@/pages/api/login";
import { subscribeToNewsLetter } from "@/pages/api/submitform";
import dlv from "dlv";
import { useState } from "react";

const myLoader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 100}`;
};
export default function Newsletter({ footerData, setUser }) {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [warning, setWarning] = useState(dlv(footerData, "warning"));

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    // Use a regular expression to check if the input matches the email pattern.
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const isValidEmail = emailPattern.test(inputEmail);
    setEmail(inputEmail);
    setIsValid(isValidEmail);
  };

  const handleSubscription = async (e) => {
    e.preventDefault();
    if (isValid) {
      const newsLetterData = await subscribeToNewsLetter(email);
      if (newsLetterData.errors) {
        newsLetterData.errors.map((error) => {
          setWarning(error.message);
          setIsValid(false);
        });
      } else {
        setWarning(newsLetterData.data.subscribeEmailToNewsletter.status);
        setIsValid(false);
        const fetchedCustomer = await customer(setUser);
        if(fetchedCustomer.data.customer){
          setUser(fetchedCustomer);
        }
      }
    } else {
      setIsValid(false);
      setWarning(dlv(footerData, "warning"));
    }
  };

  return (
    <div className="highlighted_bg">
      <div className="main_container">
        <div className="newsletter">
          <div className="newsletter_cnt_block">
            <div className="newsletter_col">
              <div className="head">
                {dlv(footerData, "heading") && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-8 h-8 mr-2 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                )}

                {dlv(footerData, "heading") && (
                  <span className="title">{dlv(footerData, "heading")}</span>
                )}
              </div>
            </div>
            <div className="newsletter_col scnd_col">
              {dlv(footerData, "title") && (
                <p className="primary_text">{dlv(footerData, "title")}</p>
              )}
            </div>
          </div>
          <div className="newsletter_block">
            <div className="email_field">
              <input
                type="email"
                name=""
                onChange={handleEmailChange}
                value={email}
                id=""
                placeholder={
                  dlv(footerData, "placeholder") &&
                  dlv(footerData, "placeholder")
                }
              />
              <button aria-label="Subscribe" className="news_cta" onClick={handleSubscription}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="#EC6737"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </div>
            {!isValid && (
              <p
                style={{
                  color: "yellow",
                  padding: "10px",
                  paddingLeft: "20px",
                }}
              >
                {warning}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
