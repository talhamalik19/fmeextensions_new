import { useRouter } from 'next/router';
import { useEffect } from 'react'
import { useState } from 'react'
import { getCartItems } from '@/pages/api/cart';
import dlv from 'dlv';
import { getCookie } from 'cookies-next';
import LoadingAnimation from '../shared/LoadingAnimation';

export default function AddCartDialog({ setCartState, cartState, product, closeModal, setCartItems, cartButton }) {
    const router = useRouter();
    const overlayBg = {
        backgroundColor: 'rgba(228, 113, 67, 0.40)',
    };
    const backGroundGlass = {
        backgroundImage: 'linear-gradient(139deg, rgba(241, 216, 246, 0.28) 1.26%, rgba(251, 232, 228, 0.98) 39.08%, rgba(254, 238, 245, 0.45) 76.82%)',
        border: '1px solid #fff',
    };
    const [countdown, setCountdown] = useState(6);

    useEffect(() => {
        if (cartState) {
            const timeoutId = setTimeout(() => {
                setCartState(false);

                if (setCartItems) {
                    closeModal(false)
                    clearTimeout(timeoutId);
                    setCountdown(6)
                }
                document.body.style.overflow = 'auto';
            }, 6000); // 6000 milliseconds = 6 seconds

            const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown <= 1) {
                        clearInterval(countdownInterval);
                    }
                    return prevCountdown - 1;
                });
            }, 1000); // Update the countdown every 1 second (1000 milliseconds)

            return () => {
                closeModal(false)
                clearTimeout(timeoutId);
                clearInterval(countdownInterval);
                setCountdown(6)
            };
        }
    }, [cartState, setCartState]);

    async function checkCartId() {
        if (getCookie("cart_id")) {
            const cartItems = await getCartItems();
            if (dlv(cartItems, 'data.cart.items.length') > 0) {
                setCartState(false);
                closeModal(false);
                setCountdown(6);
                router.push('/cart')
            }else{
                const cartItems = await getCartItems();
                if (dlv(cartItems, 'data.cart.items.length') > 0) {
                    setCartState(false);
                    closeModal(false);
                    setCountdown(6);
                    router.push('/cart')
                }else{
                    console.log('No Items In cart')
                }
            }
        } else {
            setTimeout(checkCartId, 1000);
        }
    }

    const handleViewCart = async () => {
        checkCartId();
    };



    return (

        cartState && <div className="dialog_main overlay fixed inset-0 z-20">
            <div style={overlayBg} className='dialog_size fixed inset-0 w-full h-full' onClick={() => {setCartState(false); document.body.style.overflow = 'auto';}}></div>
            <div className='dialog_position flex items-center justify-center min-h-screen px-5'>
                <div style={backGroundGlass} className='dialog_block max-w-3xl w-full p-3 rounded-lg relative'>
                    <div className='bg-secondaryColor py-8 px-8 md:py-10 md:px-10 xl:py-12 xl:px-12 rounded-lg'>
                        <h3 className='text-2xl md:text-3xl xl:text-4xl font-semibold text-center text-titleColor'>{product && product.name}</h3>
                        <p className='text-base md:text-lg xl:text-lg py-6 xl:py-8 text-center text-textColor md:w-9/12 m-auto'>was added to your shopping cart</p>
                        <div className="dialog_cta flex flex-wrap items-center justify-center gap-5">
                            <button className='text-base md:text-lg xl:text-xl min-w-[10em] bg-primaryColor text-secondaryColor border-solid border-[1px] border-primaryColor rounded-full text-center py-2 px-4 hover:bg-transparent hover:text-primaryColor transition-all' onClick={() => {setCartState(false); document.body.style.overflow = 'auto';}}>Continue Shopping ({countdown})</button>
                            <button className='btn-cart loading_action text-base md:text-lg xl:text-xl min-w-[10em] bg-transparent text-textColor border-solid border-[1px] border-textColor rounded-full text-center py-2 px-4 hover:bg-textColor hover:text-secondaryColor transition-all' onClick={handleViewCart}>View Cart & Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
          
        </div>

    )
}
