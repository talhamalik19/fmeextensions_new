import { useEffect, useState } from 'react'
import dlv from 'dlv';
import Card from '@/components/shared/Card';
import ProductCardPlaceholder from '@/components/shared/ProductCardPlaceholder';
import { getProductsByFilter } from '@/pages/api/product';
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    TwitterIcon,
    TwitterShareButton
} from 'next-share';
import { useRouter } from 'next/router';

export default function BlogSideBar({ blogProduct, sarabun }) {
    const formattedString = blogProduct.map(id => `"${id}"`).join(',');
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(6);
    const [blockContent, setBlockContent] = useState([]);
    const router = useRouter();

    const fetchProducts = async () => {
        const filterQuery = `filter: {sku: {in: [${formattedString}]}}`;
        const results = await getProductsByFilter(filterQuery, pageSize, page, '');
        if (dlv(results, 'data.products')) {
            setProducts((prev) => [...prev, ...results.data.products.items]);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [blogProduct])
    return (
        <>
            <div className="blog_sidebar">
                <ul className="blog_share">
                    <li>
                        <div>
                            <TwitterShareButton
                                url={process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com' + router.asPath.replace(/\?.*/, '')} >
                                <TwitterIcon size={50} round bgStyle={{ fill: 'transparent' }} iconFillColor='#DB4D2D' />
                            </TwitterShareButton>
                        </div>
                    </li>
                    <li>
                        <div>
                            <LinkedinShareButton
                                url={process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com' + router.asPath.replace(/\?.*/, '')} >
                                <LinkedinIcon size={50} round bgStyle={{ fill: 'transparent' }} iconFillColor='#DB4D2D' />
                            </LinkedinShareButton>
                        </div>
                    </li>
                    <li>
                        <div>
                            <FacebookShareButton
                                url={process.env.NEXT_PUBLIC_BASE_URL || 'https://www.fmeextensions.com' + router.asPath.replace(/\?.*/, '')} >
                                <FacebookIcon size={50} round bgStyle={{ fill: 'transparent' }} iconFillColor='#DB4D2D' />
                            </FacebookShareButton>
                        </div>
                    </li>
                </ul>

                <div className="blog_product">
                    {products && products.length > 0 ? products.map((item, index) => {
                        if (item.type !== 4) {
                            return (<Card
                                key={index}
                                product={item}
                                buyNowButton={dlv(blockContent, 'button')}
                                isLast={index === products.length - 1}
                                newLimit={() => setPage(page + 1)}
                                pageName={'pageName'}
                                sarabun={sarabun}
                            />)
                        }
                    })
                        :
                        <ProductCardPlaceholder />
                    }
                </div>
            </div>
        </>
    )
}
