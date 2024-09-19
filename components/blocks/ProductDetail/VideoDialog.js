import dlv from 'dlv';
import React from 'react'

export default function VideoDialog({ videoOpen, setVideoOpen, video, video_url }) {
    const overlayBg = {
        backgroundColor: '#e4714366',
    };
    const closeModal = () => {
        setVideoOpen(false);
        // Re-enable scrolling when the popup is closed
        document.body.style.overflow = 'auto';
    };
    const backGroundGlass = {
        backgroundImage: 'linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)',
        border: '1px solid #fff',
        backgroundColor:'transparent'
    };
    console.log("video",video)
    console.log("video url",video_url)
    return (

        videoOpen && (
            // If state is true show below block
            <div className="dialog_main overlay video_popup">
                <div style={overlayBg} className='dialog_size ' onClick={closeModal}></div>
                <div className='dialog_position'>
                    <div className='dialog_outer popup_width' style={backGroundGlass}>
                        <div className=" popup_close">
                            <button className="btn "
                                onClick={closeModal}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 20 20" fill="none">
                                    <path d="M19 1L1 19M1 1L19 19" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className='popup_inner'>
                            <iframe width="640" height="660" src={video ? dlv(video,'0.video_content.video_url') : video_url} title={dlv(video,'0.video_content.video_title')} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                        </div>

                    </div>
                </div>
            </div>
        )

    )
}
