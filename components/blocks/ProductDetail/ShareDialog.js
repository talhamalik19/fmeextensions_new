import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappShareButton, WhatsappIcon } from 'next-share';

const ShareDialog = ({ shareCta, closeModal }) => {
    const overlayBg = {
        backgroundColor: 'rgba(228, 113, 67, 0.40)',
    };
    const backGroundGlass = {
        backgroundImage: 'linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)',
        border: '1px solid #fff',
    };

    const [copyMessage, setCopyMessage] = useState('');
    const router = useRouter();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fmeaddons.com';
    const fullUrl = `${baseUrl}${router.asPath.replace(/\?.*/, '')}`;

    const handleCopyLink = (event) => {
        event.preventDefault();
        const link = event.currentTarget.href;

        navigator.clipboard.writeText(link)
            .then(() => {
                setCopyMessage('Link copied to clipboard');
            })
            .catch((err) => {
                setCopyMessage('Failed to copy the link');
                console.error('Failed to copy the link: ', err);
            });

        setTimeout(() => setCopyMessage(''), 2000); // Clear message after 2 seconds
    };


    return (
        <>
            {shareCta &&
                <>
                    <div className="dialog_main overlay fixed inset-0 z-20">
                        <div style={overlayBg} className="dialog_size fixed inset-0 w-full h-full" onClick={closeModal}></div>
                        <div className="dialog_position flex items-center justify-center min-h-screen px-4 py-4">
                            <div className="popup-content-h popup_ask_cnt flex items-center justify-center flex-col  max-w-3xl w-full">
                                <div style={backGroundGlass} className="dialog_block max-w-3xl w-full p-3 rounded-lg relative h-full">
                                    <div className=" bg-secondaryColor py-8 px-8 md:py-6 md:px-10 xl:py-6 xl:px-12 rounded-lg overflow-x-auto h-full">
                                        <div className="popup-content-scroll overflow-auto">
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
                                                        <h3 className="text-xl md:text-1xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-center text-titleColor mb-3">Share</h3>
                                                    </div>
                                                </div>
                                                <div className='flex justify-center gap-3 m-5'>
                                                    <FacebookShareButton style={{ border: '1px solid #E7E7E7', borderRadius: '50px' }} url={fullUrl}>
                                                        <FacebookIcon size={45} round bgStyle={{ fill: 'transparent' }} iconFillColor='#DB4D2D' />
                                                    </FacebookShareButton>

                                                    <WhatsappShareButton style={{ border: '1px solid #E7E7E7', borderRadius: '50px' }} url={fullUrl}>
                                                        <WhatsappIcon size={45} round bgStyle={{ fill: 'transparent' }} iconFillColor='#DB4D2D' />
                                                    </WhatsappShareButton>

                                                    <TwitterShareButton style={{ border: '1px solid #E7E7E7', borderRadius: '50px' }} url={fullUrl}>
                                                        <TwitterIcon size={45} round bgStyle={{ fill: 'transparent' }} iconFillColor='#DB4D2D' />
                                                    </TwitterShareButton>

                                                </div>

                                                <div className='text-center'>
                                                    <Link href={fullUrl} className='primary_cta ' onClick={handleCopyLink}>Copy Link</Link>
                                                    {copyMessage && <p className='sucess text-base text-green-500 p-3'>{copyMessage}</p>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            }
        </>
    )
}

export default ShareDialog
