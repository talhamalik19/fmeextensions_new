import CartList from './CartList'
import dlv from 'dlv'
import { useEffect } from 'react';
import { useState } from 'react';
import { customBlocks } from '@/pages/api/page';

export default function Cart({ user, cartItems, pageName, sarabun }) {
    const [blockContent, setBlockContent] = useState([]);
    const fetchProductCta = async () => {
        const customBlocksData = await customBlocks('empty-cart');
            try {
                setBlockContent(JSON.parse(customBlocksData.data.blocks_data)[0]);
            } catch (e) {  }
    }
    useEffect(() => {
        fetchProductCta();
    }, [user])

    // Apply Cuppon Popup
    const [cupponDialog, setCupponDialog] = useState(false)
    const openModal = () => {
        setCupponDialog(true)
        document.body.style.overflow = 'hidden';
    }

    return (
        <>
            <div className="cart shoping_pg">
                <div className="cart_inner lg:flex gap-6">
                    <CartList user={user} cartData={dlv(cartItems, 'data.cart')} blockContent={blockContent} pageName={pageName} openModal={openModal} setCupponDialog={setCupponDialog} cupponDialog={cupponDialog} sarabun={sarabun}/>
                </div>
            </div>
        </>
    )
}
