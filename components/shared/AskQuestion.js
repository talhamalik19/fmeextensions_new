import React, { useRef, useState } from "react"
import dlv from 'dlv';
import faq from '@/pages/api/faq';
import ReCAPTCHA from "react-google-recaptcha";
import LoadingAnimation from "./LoadingAnimation";

export default ({ blockContent, product, faqModal, setFaqModal, sarabun }) => {

    const [isOpen, setIsOpen] = useState(faqModal || false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [question, setQuestion] = useState('')
    const [errorHandling, setErrorHandling] = useState('')
    const [isSuccess, setIsSuccess] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const recaptchaRef = useRef(null);
    let token = false;

    function openModal() {
        setErrorHandling('')
        setIsOpen(true)
        setName('')
        setEmail('')
        setQuestion('')
        document.body.style.overflow = 'hidden';
    }

    const closeModal = () => {
        setIsOpen(false);
        if (faqModal) {
            setFaqModal(false)
        }
        setErrorHandling('')
        document.body.style.overflow = 'auto';
        // Re-enable scrolling when the popup is closed
    };

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }

    const handleQuestion = (event) => {
        setQuestion(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            setIsLoading(true)
            if (product?.id) {
                const userReview = await faq(name, email, question, product?.id, token);
                if (userReview?.errors) {
                    setIsLoading(false)
                    setIsSuccess(false)
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                    setErrorHandling(userReview?.errors[0]?.message)
                } else {
                    if (userReview?.data?.faqFormSubmit?.success_message) {
                        setIsLoading(false)
                        setIsSuccess(true)
                        setErrorHandling('Question Submitted')
                        setName('')
                        setEmail('')
                        setQuestion('')
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                    } else {
                        setIsLoading(false)
                        setIsSuccess(false)
                        try {
                            await fetch(`/api/log_error`, {
                                method: 'GET',
                                headers: {
                                    'content': `${JSON.stringify(userReview)}`,
                                    'note': `3`,
                                    'author': `11`
                                },
                            });
                        } catch (e) { console.log(e) }

                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                    }
                }
            } else {
                setIsLoading(false)
                setIsSuccess(false)
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
                try {
                    await fetch(`/api/log_error`, {
                        method: 'GET',
                        headers: {
                            'content': `Product Id is not defined`,
                            'note': `7`,
                            'author': `11`
                        },
                    });
                } catch (e) { console.log(e) }
            }
            // Redirect or perform any necessary action after successful login
        } catch (error) {
            setIsLoading(false)
            setIsSuccess(false)
            try {
                await fetch(`/api/log_error`, {
                    method: 'GET',
                    headers: {
                        'content': `${error?.message}`,
                        'note': `1`,
                        'author': `11`
                    },
                });
            } catch (e) { console.log(e) }

            if (recaptchaRef.current) {
                recaptchaRef.current.reset();
            }
            setErrorHandling(error?.message || 'Invalid Request');
            // Handle login error
        }
    }

    const overlayBg = {
        backgroundColor: 'rgba(228, 113, 67, 0.40)',
    };
    const backGroundGlass = {
        backgroundImage: 'linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)',
        border: '1px solid #fff',
    };

    const onReCAPTCHAChange = (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }
        token = captchaCode;
    };

    return (
        isOpen ? (
            <div className="dialog_main overlay fixed inset-0 z-20">
                <LoadingAnimation isLoading={isLoading} />
                <div style={overlayBg} className="dialog_size fixed inset-0 w-full h-full" onClick={closeModal}></div>
                <div className="dialog_position flex items-center justify-center min-h-screen px-4 py-4">
                    <div className="popup-content-h popup_ask_cnt flex items-center justify-center flex-col md:h-[auto] lg:h-[auto] xl:h-[auto] 2xl:h-[auto] max-w-3xl w-full">
                        <div style={backGroundGlass} className="dialog_block max-w-3xl w-full p-3 rounded-lg relative h-full">
                            <div className=" bg-secondaryColor py-8 px-8 md:py-6 md:px-10 xl:py-6 xl:px-12 rounded-lg overflow-x-auto h-full">
                                <div className="popup-content-scroll overflow-auto  lg:h-[auto]">
                                    <div className="flex justify-end absolute top-5 right-5">
                                        <button className="p-2 text-gray-400 rounded-full bg-[#FFEADE] cursor-pointer"
                                            onClick={closeModal}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none">
                                                <path d="M19 1L1 19M1 1L19 19" stroke="#484848" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="">
                                        <div className="flex justify-end absolute top-5 right-5">
                                            <button className="p-2 text-gray-400 rounded-full bg-[#FFEADE] cursor-pointer"
                                                onClick={closeModal}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none">
                                                    <path d="M19 1L1 19M1 1L19 19" stroke="#484848" strokeWidth="2" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </div>
                                        <div className="">
                                            <div className="space-y-2 ">
                                                <h3 className={`${sarabun} text-xl md:text-1xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-center text-titleColor mb-3`}>Ask A Question</h3>
                                            </div>
                                            <form onSubmit={handleFormSubmit} className="space-y-2 pb-2" >
                                                <div>
                                                    <input
                                                        onChange={handleName}
                                                        value={name}
                                                        type="text"
                                                        required
                                                        placeholder="Your Name *"
                                                        className="w-full mt-2 px-4 py-4 text-gray-500 bg-transparent outline-none border rounded-lg min-h-[50px] xl:min-h-[60px]"
                                                    />
                                                </div>
                                                <div>
                                                    <input
                                                        onChange={handleEmail}
                                                        value={email}
                                                        type="email"
                                                        required
                                                        placeholder="Your Email *"
                                                        className="w-full mt-2 px-4 py-4 text-gray-500 bg-transparent outline-none border rounded-lg min-h-[50px] xl:min-h-[60px]"
                                                    />
                                                </div>
                                                {/* <div>
                                                    <select className="w-full mt-2 px-4 py-4 text-gray-500 bg-transparent outline-none border rounded-lg min-h-[50px] xl:min-h-[60px]">
                                                        <option selected disabled>Visibility</option>
                                                        <option>Private</option>
                                                        <option>Public</option>
                                                    </select>
                                                </div> */}
                                                <div>
                                                    <textarea
                                                        value={question}
                                                        onChange={handleQuestion}
                                                        required
                                                        placeholder="What would you like to know? *"
                                                        rows={4}
                                                        className="w-full mt-2 px-4 py-4 text-gray-500 bg-transparent outline-none border rounded-lg resize-none"
                                                    ></textarea>
                                                </div>
                                                <div className="recaptcha">
                                                    <ReCAPTCHA
                                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Lc60jAdAAAAANlq5hBUm6By4EtksTk91hKLDlqx`}
                                                        onChange={onReCAPTCHAChange}
                                                        ref={recaptchaRef}
                                                    />
                                                </div>
                                                <p className={isSuccess ? 'text-green-500' : 'text-red'}>{errorHandling && errorHandling}</p>
                                                <button
                                                    className="text-base md:text-lg xl:text-xl min-w-[8em] bg-transparent text-primaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-primaryColor hover:text-secondaryColor transition-all"
                                                >
                                                    {dlv(blockContent.links[0].button[1], 'field_text', '')}
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        ) : <button onClick={openModal} className={`primary_cta secondary_cta link`}>{dlv(blockContent, 'links') && dlv(blockContent.links[0].button[1], 'field_text', '')}</button>
    )
}