import { useEffect, useState } from 'react'

export default function ScrollTop() {
    const [isVisible, setIsVisible] = useState(false);

    const ScrollVisible = () => {
        if(window.scrollY > 150){
            setIsVisible(true);
        }else{
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top:0,
            behavior: 'smooth',
        })
    }
    useEffect(() => {
        window.addEventListener('scroll', ScrollVisible);
        return () =>{
            window.removeEventListener('scroll', ScrollVisible)
        }
    }, [])

    return (
        <>
            <div className={`scroll_top ${isVisible ? 'visible' : ''}`} onClick={scrollToTop}>
                <span className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="15" viewBox="0 0 11 15" fill="none">
                        <path d="M5.5 13.8327V1.16602M5.5 1.16602L10.25 5.91602M5.5 1.16602L0.75 5.91602" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>
        </>
    )
}
