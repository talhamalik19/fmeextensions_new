import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import dlv from "dlv";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { imageLoader } from '@/components/shared/imageLoader';

export default function MagentoImageSlider({ customGallery, sarabun }) {
    const [open, setOpen] = useState(false);
    const [swiper, setSwiper] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(null); // State to store the selected index
    const [selectedGalleryIndex, setSelectedGalleryIndex] = useState(0);

    useEffect(() => {
        // Set the selected index to the first index when the component mounts
        setSelectedIndex(0);
    }, []);

    const filterSlider = customGallery.filter((item) => !dlv(item, 'disabled'));
    const slides = filterSlider
        .map((item) => ({
            src: dlv(item, 'url'),
            alt: dlv(item, 'label'),
            width: 3840,
            height: 2560,
            srcSet: [
                { src: dlv(item, 'url'), width: 320, height: 213 },
                { src: dlv(item, 'url'), width: 640, height: 426 },
                { src: dlv(item, 'url'), width: 1200, height: 800 },
                { src: dlv(item, 'url'), width: 2048, height: 1365 },
                { src: dlv(item, 'url'), width: 3840, height: 2560 },
            ],
        }));


    const handleListItemClick = (index) => {
        if (swiper) {
            swiper.slideTo(index);
        }
        setSelectedIndex(index);
    };

    return (
        <>
            <ul className="mgt_ft_lst">
                {filterSlider &&
                    filterSlider.map((mgtLst, index) => (
                        mgtLst.label && <li
                            key={`bubble-${index}`}
                            className={`mgt_ft_item ${index === selectedIndex ? 'highlighted' : ''}`}
                            onClick={() => handleListItemClick(index)}
                        >
                            {dlv(mgtLst, 'label') && dlv(mgtLst, 'label').split('|')[0] !== undefined
                                ? dlv(mgtLst, 'label').split('|')[0]
                                : ''}
                        </li>
                    ))}
            </ul>
            <div className="mgt_img_slider">
                <Swiper
                    modules={[Navigation, Scrollbar]}
                    navigation
                    spaceBetween={40}
                    autoHeight={true}
                    onSwiper={(swiper) => setSwiper(swiper)}
                >
                    {filterSlider &&
                        filterSlider.map((images, index) => {
                            if (!dlv(images, 'disabled')) {
                                return (
                                    <SwiperSlide key={`swiper-${index}`}>
                                        <div className="image_col center-img">
                                            <div className="image_col_inner">
                                                <Image
                                                    loader={imageLoader}
                                                    src={dlv(images, 'url')}
                                                    /* alt={dlv(images, 'label') && dlv(images, 'label').split('|')[0] !== undefined
                                                    ? dlv(images, 'label').split('|')[0]
                                                    : ''} */
                                                    alt={dlv(images, 'label')}
                                                    width={626}
                                                    height={444}
                                                    style={{ width: 'auto', height: 'auto' }}
                                                    className='cursor-pointer'
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setSelectedGalleryIndex(index);
                                                    }}
                                                />
                                            </div>
                                            <div className="pd_slider_cnt">
                                                <div className="slide_text">{/* {dlv(images, 'label') && dlv(images, 'label').split('|')[0] !== undefined
                                                ? dlv(images, 'label').split('|')[0]
                                                : ''} */}
                                                    {dlv(images, 'label')}
                                                </div>
                                                {dlv(images, 'image_description') && <p className=' primary_text'>{dlv(images, 'image_description')}</p>}
                                                {/* {dlv(images, 'label') && dlv(images, 'label').split('|')[1] !== undefined
                                                ? <p className='text-center primary_text'>{dlv(images, 'label').split('|')[1]}</p>
                                                : ''} */}
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                )
                            }
                        }
                        )}
                </Swiper>
                <Lightbox open={open} close={() => setOpen(false)} plugins={[Zoom]} showPrevNext={false} slides={slides} index={selectedGalleryIndex} />
            </div>
        </>
    );
}
