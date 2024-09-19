import React, { useState } from "react"
import dlv from 'dlv';
import review from '@/pages/api/review';
import ReCAPTCHA from "react-google-recaptcha";
import LoadingAnimation from "./LoadingAnimation";
import { Star } from "./RattingStar";

export default ({ blockContent, product, toggleReview, setToggleReview, sarabun }) => {
    const [state, setState] = useState(toggleReview || false)
    const [reviewGoodSupport, setReviewGoodSupport] = useState(null)
    const [reviewEasyToUse, setReviewEasyToUse] = useState(null)
    const [reviewWorksWell, setReviewWorksWell] = useState(null)
    const [reviewOverAllRating, setReviewOverAllRating] = useState(4)
    const [nickname, setNickName] = useState()
    const [summary, setSummary] = useState()
    const [text, setText] = useState()
    const [errorHandling, setErrorHandling] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [addClass, setAddClass] = useState(false)
    const recaptchaRef = React.createRef();
    const [isLoading, setIsLoading] = useState(false)
    let token = false;

    const overAllRating = [{ bg: "0", ring: "ring-[#2563EB]" }, { bg: "1", ring: "ring-[#8B5CF6]" }, { bg: "2", ring: "ring-[#DB2777]" }, { bg: "3", ring: "ring-[#475569]" }, { bg: "4", ring: "ring-[#EA580C]" }]

    const reviewWorksWellId = ["MQ==", "Mg==", "Mw==", "NA==", "NQ=="]; //WorksWell
    const reviewGoodSupportId = ["MTE=", "MTI=", "MTM=", "MTQ=", "MTU="]; //GoodSupport
    const reviewEasyToUseId = ["Ng==", "Nw==", "OA==", "OQ==", "MTA="]; //EasyToUse
    const reviewOverAllRatingId = ["MTY=", "MTc=", "MTg=", "MTk=", "MjA="];


    function openModal() {
        setErrorHandling('')
        setState(true)
        setReviewGoodSupport(null)
        setReviewEasyToUse(null)
        setReviewWorksWell(null)
        setReviewOverAllRating(4)
        document.body.style.overflow = 'hidden';
    }
    const closeModal = () => {
        setState(false);
        document.body.style.overflow = 'auto';
        if (toggleReview) {
            setToggleReview(false)
            document.body.style.overflow = 'auto';
        }
        // Re-enable scrolling when the popup is closed
    };


    const handleOverAllRatingClick = (value) => {
        setReviewOverAllRating(value)
        setAddClass(true);
    }

    const handleWorksWell = (event) => {
        if (event.target.id == 'work_well-yes') {
            setReviewWorksWell(4)
        } else {
            setReviewWorksWell(0)
        }
        setAddClass(true);
    }

    const handleGoodSupport = (event) => {
        if (event.target.id == 'good_support-yes') {
            setReviewGoodSupport(4)
        } else {
            setReviewGoodSupport(0)
        }
        setAddClass(true);
    }

    const handleEaseToUse = (event) => {
        if (event.target.id == 'easy_use-yes') {
            setReviewEasyToUse(4)
        } else {
            setReviewEasyToUse(0)
        }
        setAddClass(true);
    }

    const handleNickName = (event) => {
        setNickName(event.target.value)
    }

    const handleSummary = (event) => {
        setSummary(event.target.value)
    }

    const handleReview = (event) => {
        setText(event.target.value)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (reviewWorksWell == null) {
            setIsSuccess(false);
            setErrorHandling('Please Select Did it work well?')
        }

        if (reviewGoodSupport == null) {
            setIsSuccess(false);
            setErrorHandling('Please Select If Good Support was provided')
        }

        if (reviewEasyToUse == null) {
            setIsSuccess(false);
            setErrorHandling('Please Select Was it easy to use?')
        }

        if (reviewOverAllRating == null) {
            setIsSuccess(false);
            setErrorHandling('Please Select How would you rate overall')
        }

        if (!nickname) {
            setIsSuccess(false);
            setErrorHandling('Please Enter Your Nick Name')
        }

        if (reviewGoodSupport != null && reviewEasyToUse != null && reviewWorksWell != null && reviewOverAllRating != null && nickname) {
            setIsLoading(true)
            try {
                const userReview = await review(product.sku, reviewGoodSupportId[reviewGoodSupport], reviewEasyToUseId[reviewEasyToUse], reviewWorksWellId[reviewWorksWell], reviewOverAllRatingId[reviewOverAllRating], nickname, summary, text, token);
                if (userReview.errors) {
                    setIsLoading(false)
                    setIsSuccess(false)
                    setErrorHandling(userReview.errors[0].message)
                    if (recaptchaRef.current) {
                        recaptchaRef.current.reset();
                    }
                    // if(toggleReview){
                    //     setToggleReview(false)
                    // }
                } else {
                    if (userReview.data.createProductReview.review.nickname === nickname) {
                        setIsLoading(false)
                        setIsSuccess(true)
                        setErrorHandling('Review Submitted')
                        setReviewWorksWell(null)
                        setReviewGoodSupport(null)
                        setReviewEasyToUse(null)
                        setNickName('')
                        setSummary('')
                        setText('')
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        if (toggleReview) {
                            setToggleReview(false)
                        }
                    } else {
                        setIsLoading(false)
                        setIsSuccess(false)
                        setErrorHandling(userReview.errors[0].message)
                        if (recaptchaRef.current) {
                            recaptchaRef.current.reset();
                        }
                        // if(toggleReview){
                        //     setToggleReview(false)
                        // }
                    }
                }

                // Redirect or perform any necessary action after successful login
            } catch (error) {
                if (recaptchaRef.current) {
                    recaptchaRef.current.reset();
                }
                setIsLoading(false)
                setErrorHandling(error?.message);
                // Handle login error
            }
        }
    }
    const overlayBg = {
        backgroundColor: 'rgba(228, 113, 67, 0.40)',
    };
    const backGroundGlass = {
        backgroundImage: 'linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)',
        border: '1px solid #fff',
    };
    const popupContentScroll = {

    }

    const onReCAPTCHAChange = (captchaCode) => {
        // If the reCAPTCHA code is null or undefined indicating that
        // the reCAPTCHA was expired then return early
        if (!captchaCode) {
            return;
        }
        token = captchaCode;
    };


    return (
        state ? (
            <div className="dialog_main overlay fixed inset-0 z-20">
                <LoadingAnimation isLoading={isLoading} />
                <div style={overlayBg} className="dialog_size fixed inset-0 w-full h-full" onClick={closeModal}></div>
                <div className="dialog_position flex items-center justify-center min-h-screen px-4 py-4">
                    <div className="popup-content-h flex items-center justify-center flex-col h-[90vh] lg:h-[90vh] xl:h-[96vh] 2xl:h-[750px] max-w-3xl w-full">
                        <div style={backGroundGlass} className="dialog_block max-w-3xl w-full p-3 rounded-lg relative h-full">
                            <div className="popup-content-scroll bg-secondaryColor py-6 px-8 md:py-6 md:px-10 xl:py-6 xl:px-12 rounded-lg overflow-x-auto h-full">
                                <div className="">
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
                                        <div className="space-y-2 xl:space-y-2">
                                            <h3 className={`${sarabun} text-xl md:text-1xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-center text-titleColor`}>Write Your Own Review</h3>
                                            <p className="text-base md:text-lg xl:text-lg text-center text-textColor md:w-9/12 m-auto">You are reviewing <span className="font-medium text-red-600">{product.name}</span></p>
                                        </div>

                                        <form onSubmit={handleFormSubmit} className="space-y-2" >

                                            <div className="overall_rating mt-5">
                                                <p className="label">Overall Rating</p>
                                                {
                                                    overAllRating.map((item, idx) => {
                                                        let is_active = idx <= reviewOverAllRating;

                                                        return (<td key={`quantity-${idx}`} className=" text-center ">
                                                            <label htmlFor={`quantity-${item.bg}`} className="">
                                                                <input value={item.bg} id={`quantity-${item.bg}`} type="radio" defaultChecked={`quantity-${idx}` == `quantity-${1}` ? true : false} name="quantity" className="sr-only peer" />
                                                                <span className={` ${item.ring}`}>

                                                                    <div className="rating cursor-pointer" onClick={() => handleOverAllRatingClick(item.bg)}>
                                                                        {
                                                                            is_active && reviewOverAllRating ? <Star fillPercentage={100} /> : <Star fillPercentage={0} />
                                                                        }
                                                                    </div>
                                                                </span>
                                                            </label>
                                                        </td>)
                                                    })
                                                }
                                            </div>

                                            <div className={'review_prod_usage'}>
                                                <div className={'usage_block'}>
                                                    <h3 className={`usage_title ${sarabun}`}>Was it easy to use?</h3>
                                                    <div className="form_field form_check full review_dialog">
                                                        <input type="radio" name={`easy_use`} id={`easy_use-yes`} className="form_check" onChange={handleEaseToUse} />
                                                        <label htmlFor={`easy_use-yes`} className="form_check_label">Yes</label>
                                                    </div>
                                                    <div className="form_field form_check full review_dialog">
                                                        <input type="radio" name={`easy_use`} id={`easy_use-no`} className="form_check" onChange={handleEaseToUse} />
                                                        <label htmlFor={`easy_use-no`} className="form_check_label">No</label>
                                                    </div>
                                                </div>
                                                <div className={'usage_block'}>
                                                    <h3 className={`usage_title ${sarabun}`}>Good Support?</h3>
                                                    <div className="form_field form_check full review_dialog">
                                                        <input type="radio" name={`good_support`} id={`good_support-yes`} className="form_check" onChange={handleGoodSupport} />
                                                        <label htmlFor={`good_support-yes`} className="form_check_label">Yes</label>
                                                    </div>
                                                    <div className="form_field form_check full review_dialog">
                                                        <input type="radio" name={`good_support`} id={`good_support-no`} className="form_check" onChange={handleGoodSupport} />
                                                        <label htmlFor={`good_support-no`} className="form_check_label">No</label>
                                                    </div>
                                                </div>
                                                <div className={'usage_block'}>
                                                    <h3 className={`usage_title ${sarabun}`}>Did it work well?</h3>
                                                    <div className="form_field form_check full review_dialog">
                                                        <input type="radio" name={`work_well`} id={`work_well-yes`} className="form_check" onChange={handleWorksWell} />
                                                        <label htmlFor={`work_well-yes`} className="form_check_label">Yes</label>
                                                    </div>
                                                    <div className="form_field form_check full review_dialog">
                                                        <input type="radio" name={`work_well`} id={`work_well-no`} className="form_check" onChange={handleWorksWell} />
                                                        <label htmlFor={`work_well-no`} className="form_check_label">No</label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className=" form_block">
                                                <div className="form_field half">
                                                    <input
                                                        onChange={handleNickName}
                                                        type="text"
                                                        required
                                                        value={nickname}
                                                        placeholder="Nick Name *"
                                                        className=" form_item"
                                                    />
                                                </div>
                                                <div className="form_field half">
                                                    <input
                                                        onChange={handleSummary}
                                                        value={summary}
                                                        type="text"
                                                        required
                                                        placeholder="Summery of your review *"
                                                        className=" form_item"
                                                    />
                                                </div>

                                                <div className="form_field full">
                                                    <textarea
                                                        value={text}
                                                        onChange={handleReview}
                                                        required
                                                        placeholder="Review *"
                                                        rows={3}
                                                        className=" form_item"
                                                    ></textarea>
                                                </div>
                                                <div className='form_button full recaptcha'>
                                                    <ReCAPTCHA
                                                        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || `6Lc60jAdAAAAANlq5hBUm6By4EtksTk91hKLDlqx`}
                                                        onChange={onReCAPTCHAChange}
                                                        ref={recaptchaRef}
                                                    />
                                                </div>
                                                {errorHandling &&
                                                    <div className="form_field full">
                                                        <p className={isSuccess ? 'sucess' : 'error'}>{errorHandling}</p>
                                                    </div>
                                                }
                                                <div className="form_field full pop_cta_btm">
                                                    <button
                                                        className="text-base md:text-lg xl:text-xl min-w-[8em] bg-transparent text-primaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-primaryColor hover:text-secondaryColor transition-all"
                                                    >
                                                        {blockContent && dlv(blockContent, 'links.0.button.0.field_text', '').split('|')[0]}
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ) : <>
            <button onClick={openModal} className={`primary_cta secondary_cta link`}>{blockContent && dlv(blockContent, 'links.0.button.0.field_text', '').split('|')[0]}</button>
            <button onClick={openModal} className={`primary_cta secondary_cta link review_button_res`}>{blockContent && dlv(blockContent, 'links.0.button.0.field_text', '').split('|')[1]}</button>
        </>
    )
}